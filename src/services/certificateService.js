import { certificateRecords } from "../data/certificates.js";

const normalise = (value = "") => value.trim().toLowerCase();
const pause = (milliseconds = 650) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function findLocalCertificate(certificateNo) {
  const requestedNumber = normalise(certificateNo);

  return certificateRecords.find(
    (record) => normalise(record.certificateNo) === requestedNumber,
  );
}

async function requestFromApi(path, options) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

  if (!apiBaseUrl) {
    return null;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, options);
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "The request could not be completed.");
  }

  return payload;
}

const VITE_SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_ANON_KEY=import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function verifyCertificate(certificateNo) {
  const response = await fetch(
    `${VITE_SUPABASE_URL}/functions/v1/verify-certificate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        certificateNo,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Verification failed.");
  }

  return data;
}

export async function getCertificateForDownload({ certificateNo, name }) {
  const apiPayload = await requestFromApi("/api/certificates/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateNo, name }),
  });

  if (apiPayload) {
    return apiPayload.data ?? apiPayload;
  }

  await pause();
  const record = findLocalCertificate(certificateNo);

  if (!record || normalise(record.name) !== normalise(name)) {
    return null;
  }

  return record;
}
