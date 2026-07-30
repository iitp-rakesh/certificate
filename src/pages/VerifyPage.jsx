import { useEffect, useRef, useState } from "react";
import {
  HelpCircle,
  Search,
  ShieldCheck,
} from "lucide-react";

import VerificationResult from "../components/certificate/VerificationResult.jsx";
import Loader from "../components/common/Loader.jsx";
import PageHero from "../components/common/PageHero.jsx";
import { verifyCertificate } from "../services/certificateService.js";

function VerifyPage() {
  const resultRef = useRef(null);

  const [certificateNo, setCertificateNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState(null);

  useEffect(() => {
    document.title = "Verify Certificate | Navprayas";
  }, []);

  useEffect(() => {
    if (!record) {
      return;
    }

    const timer = window.setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => {
      window.clearTimeout(timer);
    };
  }, [record]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedCertificateNo = certificateNo.trim();

    if (!trimmedCertificateNo) {
      setError("Enter a certificate number to continue.");
      setRecord(null);
      return;
    }

    setLoading(true);
    setError("");
    setRecord(null);

    try {
      const response = await verifyCertificate(
        trimmedCertificateNo
      );

      if (!response?.verified || !response?.certificate) {
        setError("This certificate number was not found.");
        return;
      }

      setRecord(response.certificate);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "An unexpected error occurred while verifying the certificate."
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
              <span aria-hidden="true">
                <ShieldCheck size={23} />
              </span>

              <div>
                <h2>Certificate verification</h2>

                <p>
                  The lookup is case-insensitive, but the complete
                  certificate number is required.
                </p>
              </div>
            </div>

            <form
              className="portal-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="field-group">
                <label htmlFor="verify-certificate-number">
                  Certificate number
                </label>

                <div className="input-with-icon">
                  <Search size={19} aria-hidden="true" />

                  <input
                    id="verify-certificate-number"
                    name="certificateNumber"
                    type="text"
                    value={certificateNo}
                    onChange={handleInputChange}
                    placeholder="Enter the complete certificate number"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                      error
                        ? "certificate-verification-error"
                        : undefined
                    }
                  />
                </div>
              </div>

              {error && (
                <div
                  id="certificate-verification-error"
                  className="form-alert form-alert--error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <button
                className="button button--primary button--full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Loader label="Verifying certificate" />
                ) : (
                  <>
                    <ShieldCheck
                      size={18}
                      aria-hidden="true"
                    />
                    Verify now
                  </>
                )}
              </button>
            </form>
          </div>

          <aside className="verify-help-card">
            <span aria-hidden="true">
              <HelpCircle size={25} />
            </span>

            <h2>Where is the number?</h2>

            <p>
              The certificate number is printed near the bottom of
              the certificate and usually contains letters, numbers,
              and hyphens.
            </p>

            <code>RCS-NPCORE26-AM0003-NBA</code>
          </aside>
        </div>
      </section>

      {record && (
        <section
          ref={resultRef}
          className="verification-result-section"
          aria-label="Certificate verification result"
        >
          <div className="page-shell">
            <VerificationResult record={record} />
          </div>
        </section>
      )}
    </>
  );
}

export default VerifyPage;