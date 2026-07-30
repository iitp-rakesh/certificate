import {
  CalendarDays,
  Download,
  Hash,
  IdCard,
  Layers3,
  MonitorCheck,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

function VerificationResult({ record }) {
  if (!record) {
    return null;
  }

  /*
   * Support the possible field names returned by the API.
   */
  const certificateNumber =
    record.certificateNo ||
    record.certificateNumber ||
    "";

  const holderName =
    record.name ||
    record.fullName ||
    "";

  const contribution =
    record.contribution ||
    record.programme ||
    "";

  const role =
    record.role ||
    record.designation ||
    "";

  const mode =
    record.mode ||
    record.contributionMode ||
    "";

  const contributionYear =
    record.year ||
    record.contributionYear ||
    record.issueYear ||
    "";

  const downloadParams = new URLSearchParams({
    certificate: certificateNumber,
    name: holderName,
  });

  const details = [
    {
      label: "Certificate Number",
      value: certificateNumber,
      icon: Hash,
      featured: true,
    },
    {
      label: "Contribution",
      value: contribution,
      icon: Layers3,
    },
    {
      label: "Role",
      value: role,
      icon: IdCard,
    },
    {
      label: "Contribution Mode",
      value: mode,
      icon: MonitorCheck,
    },
    {
      label: "Contribution Year",
      value: contributionYear,
      icon: CalendarDays,
    },
  ];

  return (
    <article
      className="verified-certificate"
      aria-live="polite"
      aria-labelledby="verified-certificate-title"
    >
      {/* ==================== VERIFIED HEADER ==================== */}

      <header className="verified-certificate__header">
        <div className="verified-certificate__header-content">
          <span
            className="verified-certificate__icon"
            aria-hidden="true"
          >
            <ShieldCheck
              size={30}
              strokeWidth={1.8}
            />
          </span>

          <div>
            <span className="verified-certificate__status">
              <span aria-hidden="true" />
              Verification successful
            </span>

            <h2 id="verified-certificate-title">
              Certificate Verified
            </h2>

            <p>
              This certificate is authentic and exists in the official
              Navprayas records.
            </p>
          </div>
        </div>

        <div
          className="verified-certificate__seal"
          aria-label="Official verified certificate"
        >
          <ShieldCheck
            size={28}
            strokeWidth={1.7}
            aria-hidden="true"
          />

          <span>Official</span>
        </div>
      </header>

      {/* ==================== CERTIFICATE BODY ==================== */}

      <div className="verified-certificate__body">
        <div className="verified-certificate__holder">
          <div
            className="verified-certificate__avatar"
            aria-hidden="true"
          >
            {holderName.charAt(0).toUpperCase() || "N"}
          </div>

          <div>
            <span>Certificate holder</span>

            <h3>
              {holderName || "Not available"}
            </h3>

            <p>
              {role || contribution || "Navprayas contributor"}
            </p>
          </div>
        </div>

        {/* ==================== RECORD DETAILS ==================== */}

        <dl className="verified-certificate__grid">
          {details.map((item) => {
            const Icon = item.icon;

            const itemClassName = [
              "verified-certificate__item",
              item.featured
                ? "verified-certificate__item--featured"
                : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                className={itemClassName}
                key={item.label}
              >
                <dt>
                  <span aria-hidden="true">
                    <Icon
                      size={18}
                      strokeWidth={1.9}
                    />
                  </span>

                  {item.label}
                </dt>

                <dd>
                  {item.value || "Not available"}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      {/* ==================== CARD FOOTER ==================== */}

      <footer className="verified-certificate__footer">
        <div className="verified-certificate__footer-note">
          <ShieldCheck
            size={20}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          <div>
            <strong>Authenticity confirmed</strong>

            <span>
              Verified through the official Navprayas certificate
              verification system.
            </span>
          </div>
        </div>

        <Link
          className="verified-certificate__download"
          to={`/download?${downloadParams.toString()}`}
          aria-label={`Download certificate for ${
            holderName || "certificate holder"
          }`}
        >
          <Download
            size={18}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Download Certificate
        </Link>
      </footer>
    </article>
  );
}

export default VerificationResult;