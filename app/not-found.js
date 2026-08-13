import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-pad">
      <p className="section-label">404 — Kayıp sinyal</p>
      <h1>Bu sayfa<br /><em>hareket etmiş.</em></h1>
      <Link className="text-link" href="/">Ana sayfaya dön <span>↗</span></Link>
    </main>
  );
}
