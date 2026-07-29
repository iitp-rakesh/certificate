import { HelpCircle, Search, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import VerificationResult from "../components/certificate/VerificationResult.jsx";
import Loader from "../components/common/Loader.jsx";
import PageHero from "../components/common/PageHero.jsx";
import { verifyCertificate } from "../services/certificateService.js";
import { useRef } from "react";

const resultRef = useRef(null);

function VerifyPage() {
  const [certificateNo, setCertificateNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState(null);

  useEffect(() => {
    document.title = "Verify Certificate | Navprayas";
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!certificateNo.trim()) {
      setError("Enter a certificate number to continue.");
      return;
    }

    setLoading(true);
    setError("");
    setRecord(null);

    try {
      const response = await verifyCertificate(certificateNo);

      if (!response.verified) {
        setError("This certificate number was not found.");
        return;
      }

      setRecord(response.certificate);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(event) {
    setCertificateNo(event.target.value);
    setError("");
    setRecord(null);
  }

  return (
    <>
      <PageHero
        eyebrow="Authenticity check"
        title="Verify a certificate"
        description="Enter the unique certificate number to check whether it belongs to an official Navprayas record."
      />

      <section className="portal-section portal-section--verify">
        <div className="page-shell verify-layout">
          <div className="portal-panel verify-panel">
            <div className="portal-panel__heading">
              <span><ShieldCheck size={23} /></span>
              <div>
                <h2>Certificate verification</h2>
                <p>The lookup is case-insensitive, but the complete number is required.</p>
              </div>
            </div>

            <form className="portal-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="verify-certificate-number">Certificate number</label>
                <div className="input-with-icon">
                  <Search size={19} />
                  <input
                    id="verify-certificate-number"
                    type="text"
                    value={certificateNo}
                    onChange={handleInputChange}
                    placeholder="Enter the complete certificate number"
                    autoComplete="off"
                  />
                </div>
              </div>

              {error && <div className="form-alert form-alert--error" role="alert">{error}</div>}

              <button className="button button--primary button--full" type="submit" disabled={loading}>
                {loading ? <Loader label="Verifying certificate" /> : <><ShieldCheck size={18} /> Verify now</>}
              </button>
            </form>
          </div>

          <aside className="verify-help-card">
            <span><HelpCircle size={25} /></span>
            <h2>Where is the number?</h2>
            <p>The certificate number is printed near the bottom of the certificate and usually contains letters, numbers and hyphens.</p>
            <code>RCS-NPCORE26-AM0003-NBA</code>
          </aside>
        </div>
      </section>

      {record && (
        <section className="verification-result-section">
          <div className="page-shell">
            {record && (
              <section
                ref={resultRef}
                className="py-16 bg-slate-50"
              >
                <div className="mx-auto max-w-5xl px-4">

                  <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-8 text-white">
                      <div className="flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                          <ShieldCheck className="h-9 w-9" />
                        </div>

                        <div>
                          <h2 className="text-3xl font-bold">
                            Certificate Verified
                          </h2>

                          <p className="mt-1 text-green-100">
                            This certificate is authentic and exists in the official
                            Navprayas records.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid gap-5 p-8 md:grid-cols-2 lg:grid-cols-3">

                      <div className="rounded-2xl border bg-slate-50 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Certificate Number
                        </p>
                        <p className="mt-2 break-all text-lg font-semibold text-slate-900">
                          {record.certificateNo}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-slate-50 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Name
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {record.name}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-slate-50 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Contribution
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {record.contribution}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-slate-50 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Role
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {record.role}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-slate-50 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Mode
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {record.mode}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-slate-50 p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Contribution Year
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {record.year}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default VerifyPage;
