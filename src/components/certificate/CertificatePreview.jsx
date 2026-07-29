import BrandLogo from "../common/BrandLogo.jsx";
import StatusBadge from "../common/StatusBadge.jsx";

function CertificatePreview({ record }) {
  return (
    <article className="certificate-preview" aria-label={`Certificate preview for ${record.name}`}>
      <span className="certificate-preview__corner certificate-preview__corner--one" />
      <span className="certificate-preview__corner certificate-preview__corner--two" />
      <span className="certificate-preview__corner certificate-preview__corner--three" />
      <span className="certificate-preview__corner certificate-preview__corner--four" />

      <div className="certificate-preview__header">
        <BrandLogo compact />
        <span>NAVPRAYAS</span>
      </div>

      <p className="certificate-preview__kicker">Certificate of Appreciation</p>
      <p className="certificate-preview__intro">This certificate is proudly presented to</p>
      <h2>{record.name}</h2>
      <div className="certificate-preview__rule" />
      <p className="certificate-preview__body">
        In recognition of valuable contribution as <strong>{record.role}</strong> for {" "}
        <strong>{record.department}</strong> during {record.programme}.
      </p>

      <div className="certificate-preview__meta">
        <div>
          <span>Certificate number</span>
          <strong>{record.certificateNo}</strong>
        </div>
        <div>
          <span>Membership number</span>
          <strong>{record.membershipNo}</strong>
        </div>
        <div>
          <span>Issue date</span>
          <strong>{record.issueDate}</strong>
        </div>
      </div>

      <div className="certificate-preview__footer">
        <StatusBadge />
        <span>Digitally verifiable certificate</span>
      </div>
    </article>
  );
}

export default CertificatePreview;
