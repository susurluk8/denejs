// app/layout.js
// 📌 Amaç: Tüm sayfalara ortak olan ana layout (şablon) dosyasıdır.
// Next.js App Router'da layout.js mutlaka bir React Server Component (veya Client Component) olmalı
// ve children props'unu alıp döndürmelidir.
// Ayrıca, dosya uzantısı .js ise mutlaka 'use client' veya 'use server' eklenmeli (varsayılan server).

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stillerini projeye dahil eder
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Ürün Tanıtım Sitesi',
  description: 'Admin paneli olan Next.js ürün tanıtım uygulaması',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="container my-4">
          {children}
        </main>
      </body>
    </html>
  );
}
