function BrandLogo({ compact = false, light = false }) {
  return (
    <span className={`brand-logo ${compact ? "brand-logo--compact" : ""}`}>
      <span className="brand-logo__mark" aria-hidden="true">
        N
      </span>
      {!compact && (
        <span className={`brand-logo__copy ${light ? "is-light" : ""}`}>
          <strong>Navprayas</strong>
          <small>A Group of Innovative Thoughts</small>
        </span>
      )}
    </span>
  );
}

export default BrandLogo;
