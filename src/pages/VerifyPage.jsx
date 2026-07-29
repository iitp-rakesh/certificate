import { HelpCircle, Search, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import VerificationResult from "../components/certificate/VerificationResult.jsx";
import Loader from "../components/common/Loader.jsx";
import PageHero from "../components/common/PageHero.jsx";
import { demoCredentials } from "../data/certificates.js";
import { verifyCertificate } from "../services/certificateService.js";

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
      const matchedRecord = await verifyCertificate(certificateNo);

      if (!matchedRecord) {
        setError("This certificate number was not found in the current records.");
        return;
      }

      setRecord(matchedRecord);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "An unexpected error occurred.");
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

            <button
              type="button"
              className="demo-fill-link"
              onClick={() => {
                setCertificateNo(demoCredentials[0].certificateNo);
                setError("");
                setRecord(null);
              }}
            >
              Use demo certificate number
            </button>
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
            <VerificationResult record={record} />
          </div>
        </section>
      )}
    </>
  );
}

export default VerifyPage;
