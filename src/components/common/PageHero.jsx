function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="page-shell page-hero__inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default PageHero;
