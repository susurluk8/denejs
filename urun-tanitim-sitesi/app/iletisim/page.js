'use client';
// app/iletisim/page.js
// İletişim formu: ad, soyad, mail ve mesaj alanları ile mesaj gönderme

import { useState } from 'react';

export default function IletisimPage() {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [mail, setMail] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [basari, setBasari] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const yeniMesaj = { ad, soyad, mail, mesaj };
    const res = await fetch('/api/mesajlar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(yeniMesaj),
    });
    if (res.ok) {
      setAd(''); setSoyad(''); setMail(''); setMesaj('');
      setBasari(true);
    }
  };

  return (
    <div>
      <h1>İletişim</h1>
      <form onSubmit={handleSubmit} className="mb-4" style={{maxWidth:500}}>
        <div className="mb-2">
          <input className="form-control" placeholder="Ad" value={ad} onChange={e => setAd(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Soyad" value={soyad} onChange={e => setSoyad(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" type="email" placeholder="Mail" value={mail} onChange={e => setMail(e.target.value)} required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="Mesajınız" value={mesaj} onChange={e => setMesaj(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Gönder</button>
      </form>
      {basari && <div className="alert alert-success">Mesajınız başarıyla gönderildi!</div>}
    </div>
  );
}