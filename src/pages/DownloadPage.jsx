import { Download, FileText, Info, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CertificatePreview from "../components/certificate/CertificatePreview.jsx";
import Loader from "../components/common/Loader.jsx";
import PageHero from "../components/common/PageHero.jsx";
import { getCertificateForDownload } from "../services/certificateService.js";
import { downloadCertificatePdf } from "../utils/downloadCertificate.js";

function DownloadPage() {
  const [searchParams] = useSearchParams();
  const initialValues = useMemo(
    () => ({
      certificateNo: searchParams.get("certificate") || "",
      name: searchParams.get("name") || "",
    }),
    [searchParams],
  );

  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Download Certificate | Navprayas";
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.certificateNo.trim() || !formData.name.trim()) {
      setError("Enter both the certificate number and full name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-certificate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Certificate verification failed."
        );
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.certificateNo}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({ certificateNo: "", name: "" });
    setError("");
  }

  return (
    <>
      <PageHero
        eyebrow="Certificate service"
        title="Download your certificate"
        description="Enter the exact certificate number and registered full name to generate your official PDF."
      />

      <section className="portal-section">
        <div className="page-shell portal-layout">
          <div className="portal-panel">
            <div className="portal-panel__heading">
              <span><FileText size={23} /></span>
              <div>
                <h2>Certificate details</h2>
                <p>Both fields must match the official record.</p>
              </div>
            </div>

            <form className="portal-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="certificate-number">Certificate number</label>
                <input
                  id="certificate-number"
                  name="certificateNo"
                  type="text"
                  value={formData.certificateNo}
                  onChange={handleChange}
                  placeholder="e.g. RCS-NPCORE26-AM0003-NBA"
                  autoComplete="off"
                />
              </div>

              <div className="field-group">
                <label htmlFor="registered-name">Full name</label>
                <input
                  id="registered-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter the registered full name"
                  autoComplete="name"
                />
              </div>

              {error && <div className="form-alert form-alert--error" role="alert">{error}</div>}

              <button className="button button--primary button--full" type="submit" disabled={loading}>
                {loading ? <Loader label="Creating Your Certificate" /> : <><Download size={18} /> Download certificate</>}
              </button>
            </form>
          </div>

          <aside className="portal-aside">
            <div className="info-card">
              <span><ShieldCheck size={24} /></span>
              <h2>Secure record matching</h2>
              <p>The certificate is generated only when the certificate number and name match.</p>
            </div>
            <div className="info-note">
              <strong>Need help?</strong>
              <p>Contact Navprayas if your registered name or certificate number contains an error.</p>
              <a href="mailto:navprayas.np2000@gmail.com">navprayas.np2000@gmail.com</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default DownloadPage;
