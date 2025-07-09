// components/Navbar.js
// 📌 Amaç: Tüm sayfalarda üstte gözüken gezinme çubuğunu oluşturur.
// Bootstrap ile responsive ve modern bir navbar.

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded-bottom shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Ürün Tanıtım</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item"><Link className="nav-link" href="/">Anasayfa</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">Hakkımızda</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/urunler">Ürünler</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/iletisim">İletişim</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
