'use client';
// app/admin/mesajlar/page.js
// Admin paneli: Gelen mesajları listele, cevapla

import { useState, useEffect } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';

export default function MesajlarPage() {
  const [mesajlar, setMesajlar] = useState([]);
  const [cevap, setCevap] = useState('');
  const [secili, setSecili] = useState(null);
  const [gonderildi, setGonderildi] = useState(false);

  useEffect(() => {
    fetch('/api/mesajlar')
      .then(res => res.json())
      .then(data => setMesajlar(data));
  }, [gonderildi]);

  const handleCevapla = async (mesaj) => {
    setSecili(mesaj);
    setCevap(mesaj.cevap || '');
  };

  const handleCevapGonder = async () => {
    if (!secili) return;
    // API'ya güncelleme isteği at
    await fetch('/api/mesajlar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: secili._id, cevap }),
    });
    setGonderildi(!gonderildi);
    setSecili(null);
    setCevap('');
  };

  return (
    <div>
      <AdminNavbar />
      <h1>Gelen Mesajlar</h1>
      <ul className="list-group mb-4">
        {mesajlar.map((mesaj, i) => (
          <li key={mesaj._id || i} className="list-group-item">
            <b>{mesaj.ad} {mesaj.soyad}</b> | {mesaj.mail}<br/>
            <span>{mesaj.mesaj}</span>
            <div className="mt-2">
              <button className="btn btn-sm btn-warning me-2" onClick={()=>handleCevapla(mesaj)}>Cevapla</button>
              {mesaj.cevap && <span className="badge bg-success">Cevaplandı</span>}
            </div>
          </li>
        ))}
      </ul>
      {secili && (
        <div className="card p-3 mb-3">
          <h5>Mesajı Cevapla: {secili.ad} {secili.soyad} ({secili.mail})</h5>
          <textarea className="form-control mb-2" value={cevap} onChange={e=>setCevap(e.target.value)} placeholder="Cevabınız" />
          <button className="btn btn-primary" onClick={handleCevapGonder}>Cevabı Gönder</button>
          <button className="btn btn-secondary ms-2" onClick={()=>setSecili(null)}>Vazgeç</button>
        </div>
      )}
    </div>
  );
}
