import { Link } from "react-router-dom";

import {
  FaClock,
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.instagram.com/navprayas.np/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.youtube.com/@Navprayas2k00",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    href: "https://in.linkedin.com/company/navprayas",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://whatsapp.com/channel/0029VbAgY9H9xVJX2uTCRz1v",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
];

function Footer() {
  const currentYear = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
  }).format(new Date());

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__container">
        <div className="site-footer__grid">
          {/* Logo and social links */}
          <div className="site-footer__column site-footer__brand-column">
            <Link
              to="/"
              className="site-footer__logo-link"
              aria-label="Go to Navprayas Certificate Portal homepage"
            >
              <img
                src="/logo-01.webp"
                alt="Navprayas"
                className="site-footer__logo"
              />
            </Link>

            <div
              className="site-footer__socials"
              aria-label="Navprayas social media links"
            >
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social-link"
                    aria-label={`Visit Navprayas on ${social.label}`}
                    title={social.label}
                  >
                    <SocialIcon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact information */}
          <div className="site-footer__column">
            <h2 className="site-footer__heading">Contact Us</h2>

            <address className="site-footer__contact">
              <div className="site-footer__contact-item">
                <span
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                >
                  <FaPhone />
                </span>

                <a
                  href="tel:+916200733974"
                  className="site-footer__contact-link"
                >
                  +91 6200733974
                </a>
              </div>

              <div className="site-footer__contact-item">
                <span
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                >
                  <FaEnvelope />
                </span>

                <a
                  href="mailto:navprayas.np2000@gmail.com"
                  className="site-footer__contact-link site-footer__email"
                >
                  navprayas.np2000@gmail.com
                </a>
              </div>

              <div className="site-footer__contact-item">
                <span
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                >
                  <FaClock />
                </span>

                <span className="site-footer__contact-text">
                  03:30 PM – 06:00 PM
                </span>
              </div>

              <div className="site-footer__contact-item">
                <span
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                >
                  <FaMapMarkerAlt />
                </span>

                <a
                  href="https://maps.app.goo.gl/P4uPhnPjaVT7LoJ2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__contact-link"
                >
                  Navprayas, Main Office, House No. GE0090733, Ground Floor,
                  Manpur Patwatoli, PO + PS Buniyadganj, Gaya-823003, Bihar,
                  India
                </a>
              </div>
            </address>
          </div>

          {/* Key references */}
          <div className="site-footer__column">
            <h2 className="site-footer__heading">Key References</h2>

            <ul className="site-footer__links">
              <li>
                <Link to="/privacy-policy" className="site-footer__link">
                  Privacy Policies
                </Link>
              </li>

              <li>
                <Link to="/download" className="site-footer__link">
                  Download Certificate
                </Link>
              </li>

              <li>
                <Link to="/verify" className="site-footer__link">
                  Verify Certificate
                </Link>
              </li>

              <li>
                <Link to="/terms-condition" className="site-footer__link">
                  Terms and Conditions
                </Link>
              </li>

              <li>
                <a
                  href="https://www.navprayas.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  Main Website
                </a>
              </li>
            </ul>
          </div>

          {/* Important links */}
          <div className="site-footer__column">
            <h2 className="site-footer__heading">Important Links</h2>

            <ul className="site-footer__links">
              <li>
                <a
                  href="https://donate.navprayas.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  Donation
                </a>
              </li>

              <li>
                <a
                  href="https://www.navprayas.in/event.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  Events
                </a>
              </li>

              <li>
                <a
                  href="https://www.navprayas.in/team.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  Team
                </a>
              </li>

              <li>
                <a
                  href="https://www.navprayas.in/gallery.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  Gallery
                </a>
              </li>

              <li>
                <a
                  href="https://www.navprayas.in/about.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="site-footer__bottom">
        <div className="page-shell site-footer__bottom-inner">
          <p>© {currentYear} Navprayas. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;