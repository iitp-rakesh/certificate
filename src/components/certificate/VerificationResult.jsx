import { CalendarDays, Hash, IdCard, Layers3, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";

function VerificationResult({ record }) {
  const downloadParams = new URLSearchParams({
    certificate: record.certificateNo,
    name: record.name,
  });

  return (
    <section className="verification-card" aria-live="polite">
      <div className="verification-card__top">
        <div>
          <StatusBadge>Certificate verified</StatusBadge>
          <h2>{record.name}</h2>
          <p>{record.programme}</p>
        </div>
        <span className="verification-card__seal" aria-hidden="true">✓</span>
      </div>

      <dl className="verification-card__details">
        <div>
          <dt><Hash size={17} /> Certificate number</dt>
          <dd>{record.certificateNo}</dd>
        </div>
        <div>
          <dt><IdCard size={17} /> Membership number</dt>
          <dd>{record.membershipNo}</dd>
        </div>
        <div>
          <dt><UserRound size={17} /> Role</dt>
          <dd>{record.role}</dd>
        </div>
        <div>
          <dt><Layers3 size={17} /> Department</dt>
          <dd>{record.department}</dd>
        </div>
        <div>
          <dt><CalendarDays size={17} /> Issue date</dt>
          <dd>{record.issueDate}</dd>
        </div>
      </dl>

      <div className="verification-card__actions">
        <Link className="button button--primary" to={`/download?${downloadParams.toString()}`}>
          Download this certificate
        </Link>
      </div>
    </section>
  );
}

export default VerificationResult;
