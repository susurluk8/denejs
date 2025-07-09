// components/AdminNavbar.js
// Admin paneli için özel menü (navbar) bileşeni
import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded-bottom shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/admin">Admin Paneli</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item"><Link className="nav-link" href="/admin">Kayıtlar</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/admin/mesajlar">Mesajlar</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
