export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="screen-center">
      <section className="panel">
        <header className="panel-header">
          <span className="brand">MY LOGIN</span>
          <h1>{title}</h1>
          {subtitle && <p className="muted">{subtitle}</p>}
        </header>
        {children}
        {footer && <footer className="panel-footer">{footer}</footer>}
      </section>
    </main>
  );
}
