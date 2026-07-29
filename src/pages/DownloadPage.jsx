import { Download, FileText, Info, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CertificatePreview from "../components/certificate/CertificatePreview.jsx";
import Loader from "../components/common/Loader.jsx";
import PageHero from "../components/common/PageHero.jsx";
import { demoCredentials } from "../data/certificates.js";
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
  const [record, setRecord] = useState(null);

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
    setRecord(null);

    try {
      const matchedRecord = await getCertificateForDownload(formData);

      if (!matchedRecord) {
        setError("No matching certificate was found. Check the number and registered name.");
        return;
      }

      setRecord(matchedRecord);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({ certificateNo: "", name: "" });
    setRecord(null);
    setError("");
  }

  function useDemo(demo) {
    setFormData({ certificateNo: demo.certificateNo, name: demo.name });
    setRecord(null);
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
                {loading ? <Loader label="Checking record" /> : <><Download size={18} /> Generate certificate</>}
              </button>
            </form>

            <div className="demo-box">
              <p><Info size={16} /> Demo credentials for testing</p>
              <div className="demo-box__buttons">
                {demoCredentials.map((demo) => (
                  <button key={demo.label} type="button" onClick={() => useDemo(demo)}>
                    {demo.label}: {demo.name}
                  </button>
                ))}
              </div>
            </div>
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

      {record && (
        <section className="result-section">
          <div className="page-shell">
            <div className="result-section__heading">
              <div>
                <span className="eyebrow">Certificate ready</span>
                <h2>Preview and download</h2>
              </div>
              <div className="result-actions">
                <button type="button" className="button button--outline" onClick={resetForm}>
                  <RotateCcw size={17} /> Search another
                </button>
                <button type="button" className="button button--primary" onClick={() => downloadCertificatePdf(record)}>
                  <Download size={17} /> Download PDF
                </button>
              </div>
            </div>
            <CertificatePreview record={record} />
          </div>
        </section>
      )}
    </>
  );
}

export default DownloadPage;
