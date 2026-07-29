function Loader({ label = "Please wait" }) {
  return (
    <span className="inline-loader" role="status" aria-live="polite">
      <span className="inline-loader__spinner" aria-hidden="true" />
      {label}
    </span>
  );
}

export default Loader;
