import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <Link
          to="/"
          className="site-header__brand"
          aria-label="Navprayas Certificate Portal Home"
          onClick={closeMenu}
        >
          <img
            src="/logo-01.webp"
            alt="Navprayas"
            className="site-header__logo"
          />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>

        <nav
          id="site-navigation"
          className={`site-nav ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="site-nav__links">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `site-nav__link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/download"
              onClick={closeMenu}
              className={({ isActive }) =>
                `site-nav__link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              Download Certificate
            </NavLink>

            <NavLink
              to="/verify"
              onClick={closeMenu}
              className={({ isActive }) =>
                `site-nav__link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              Verify Certificate
            </NavLink>
          </div>

          <a
            href="https://www.navprayas.in/"
            target="_blank"
            rel="noreferrer"
            className="button button--primary button--small"
            onClick={closeMenu}
          >
            Main Website
          </a>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;