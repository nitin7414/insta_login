import { SafeLoginForm } from "./components/SafeLoginForm";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-panel" aria-label="Product preview">
        <div className="phone-frame">
          <div className="story-row">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="post-card" />
          <div className="caption-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
      <section className="auth-panel" aria-label="Access request form">
        <SafeLoginForm />
        <div className="secondary-card">Need help? Contact your workspace administrator.</div>
      </section>
    </main>
  );
}
