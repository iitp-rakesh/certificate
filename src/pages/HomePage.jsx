import {
  ArrowRight,
  BadgeCheck,
  Download,
  FileCheck2,
  Fingerprint,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ShieldCheck,
    title: "Official verification",
    description: "Confirm certificate authenticity using the unique certificate number.",
  },
  {
    icon: Download,
    title: "Instant PDF download",
    description: "Generate a clean downloadable certificate after matching your details.",
  },
  {
    icon: Fingerprint,
    title: "Unique identity",
    description: "Every certificate is connected to its own certificate and membership number.",
  },
];

const steps = [
  { number: "01", title: "Enter details", text: "Add the certificate number and the registered full name." },
  { number: "02", title: "Match record", text: "The portal checks the submitted information against the certificate record." },
  { number: "03", title: "Verify or download", text: "View verification details or download the certificate as a PDF." },
];

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__glow home-hero__glow--one" />
        <div className="home-hero__glow home-hero__glow--two" />

        <div className="page-shell home-hero__grid">
          <div className="home-hero__content">
            <span className="eyebrow eyebrow--light">
              <Sparkles size={15} /> Official Navprayas portal
            </span>
            <h1>Verify trust. Download achievement.</h1>
            <p>
              A secure and simple certificate portal for Navprayas participants,
              volunteers and team members.
            </p>
            <div className="home-hero__actions">
              <Link to="/download" className="button button--light">
                Download certificate <ArrowRight size={18} />
              </Link>
              <Link to="/verify" className="button button--glass">
                Verify certificate <SearchCheck size={18} />
              </Link>
            </div>
            <div className="home-hero__trust">
              <span><BadgeCheck size={17} /> Authentic records</span>
              <span><LockKeyhole size={17} /> Secure lookup</span>
            </div>
          </div>

          <div className="home-hero__visual" aria-hidden="true">
            <div className="hero-certificate">
              <div className="hero-certificate__brand">
                <span>N</span>
                <strong>NAVPRAYAS</strong>
              </div>
              <small>Certificate of Appreciation</small>
              <h2>Participant Name</h2>
              <div className="hero-certificate__line" />
              <p>For valuable contribution and participation</p>
              <div className="hero-certificate__meta">
                <span>Verified</span>
                <span>NP/2026/001</span>
              </div>
            </div>
            <div className="floating-verify-card">
              <FileCheck2 size={24} />
              <div>
                <strong>Certificate verified</strong>
                <span>Official Navprayas record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-access-section">
        <div className="page-shell">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Quick access</span>
            <h2>Choose what you need</h2>
            <p>Access the two main certificate services from one place.</p>
          </div>

          <div className="quick-access-grid">
            <Link to="/download" className="quick-access-card quick-access-card--purple">
              <span className="quick-access-card__icon"><Download size={26} /></span>
              <div>
                <h3>Download Certificate</h3>
                <p>Use your certificate number and registered name to generate the PDF.</p>
              </div>
              <ArrowRight className="quick-access-card__arrow" size={20} />
            </Link>

            <Link to="/verify" className="quick-access-card quick-access-card--green">
              <span className="quick-access-card__icon"><FileCheck2 size={26} /></span>
              <div>
                <h3>Verify Certificate</h3>
                <p>Check whether a certificate is an authentic Navprayas record.</p>
              </div>
              <ArrowRight className="quick-access-card__arrow" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="page-shell">
          <div className="section-heading">
            <span className="eyebrow">Built for confidence</span>
            <h2>A clearer certificate experience</h2>
            <p>Fast, responsive and designed to remain simple on every device.</p>
          </div>

          <div className="feature-grid">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="feature-card">
                <span><Icon size={25} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-section">
        <div className="page-shell steps-section__grid">
          <div className="section-heading">
            <span className="eyebrow">Simple process</span>
            <h2>Three steps to your certificate</h2>
            <p>No account or complicated dashboard is required.</p>
          </div>

          <div className="steps-list">
            {steps.map((step) => (
              <article key={step.number} className="step-card">
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
