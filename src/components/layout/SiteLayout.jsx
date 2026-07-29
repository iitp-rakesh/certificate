import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

function SiteLayout() {
  return (
    <div className="site-page">
      <ScrollToTop />
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
