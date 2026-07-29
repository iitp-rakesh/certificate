import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="page-shell not-found-page__inner">
        <span>404</span>
        <h1>Page not found</h1>
        <p>The page you requested does not exist or may have moved.</p>
        <Link to="/" className="button button--primary">
          <ArrowLeft size={18} /> Return home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
