'use client';
// app/admin/page.js
// Kişisel tabloya kayıt ekleme, silme ve güncelleme arayüzü (foto dosya yükleme destekli)

import { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';

export default function AdminPage() {
  const [kisiler, setKisiler] = useState([]);
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [telefon, setTelefon] = useState('');
  const [mail, setMail] = useState('');
  const [foto, setFoto] = useState(null);
  const [duzenleId, setDuzenleId] = useState(null);

  useEffect(() => {
    fetch('/api/kisisel')
      .then(res => res.json())
      .then(data => setKisiler(data));
  }, []);

  // Fotoğrafı yükle ve URL'sini al
  const uploadFoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/kisisel/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.url; // /uploads/...
  };

  // Kayıt ekle veya güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fotoUrl = '';
    if (foto && typeof foto !== 'string') {
      fotoUrl = await uploadFoto(foto);
    } else if (typeof foto === 'string') {
      fotoUrl = foto;
    }
    const yeniKisi = { ad, soyad, telefon, mail, foto: fotoUrl };
    if (duzenleId) {
      // Güncelle
      await fetch('/api/kisisel', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: duzenleId, ...yeniKisi }),
      });
    } else {
      // Ekle
      await fetch('/api/kisisel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(yeniKisi),
      });
    }
    setAd(''); setSoyad(''); setTelefon(''); setMail(''); setFoto(null); setDuzenleId(null);
    fetch('/api/kisisel')
      .then(res => res.json())
      .then(data => setKisiler(data));
  };

  // Sil
  const handleSil = async (id) => {
    await fetch(`/api/kisisel?id=${id}`, { method: 'DELETE' });
    fetch('/api/kisisel')
      .then(res => res.json())
      .then(data => setKisiler(data));
  };

  // Düzenle
  const handleDuzenle = (kisi) => {
    setDuzenleId(kisi._id);
    setAd(kisi.ad);
    setSoyad(kisi.soyad);
    setTelefon(kisi.telefon);
    setMail(kisi.mail);
    setFoto(kisi.foto || null);
  };

  return (
    <div>
      <AdminNavbar />
      <h1>Kişisel Kayıt Ekle / Düzenle</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input className="form-control" placeholder="Ad" value={ad} onChange={e => setAd(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Soyad" value={soyad} onChange={e => setSoyad(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Telefon" value={telefon} onChange={e => setTelefon(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Mail" value={mail} onChange={e => setMail(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input type="file" className="form-control" accept="image/*" onChange={e => setFoto(e.target.files[0])} />
          {foto && typeof foto === 'string' && <img src={foto} alt="foto" style={{width:60, marginTop:8, borderRadius:8}} />}
        </div>
        <button className="btn btn-primary" type="submit">{duzenleId ? 'Güncelle' : 'Kaydet'}</button>
        {duzenleId && <button type="button" className="btn btn-secondary ms-2" onClick={()=>{setDuzenleId(null);setAd('');setSoyad('');setTelefon('');setMail('');setFoto(null);}}>Vazgeç</button>}
      </form>
      <h2>Kayıtlı Kişiler</h2>
      <ul className="list-group">
        {kisiler.map((kisi, i) => (
          <li key={kisi._id || i} className="list-group-item d-flex align-items-center gap-3">
            {kisi.foto && <img src={kisi.foto} alt="foto" style={{width:60, height:60, objectFit:'cover', borderRadius:8}} />}
            <span><b>{kisi.ad} {kisi.soyad}</b><br/>{kisi.telefon} | {kisi.mail}</span>
            <button className="btn btn-danger btn-sm ms-auto" onClick={()=>handleSil(kisi._id)}>Sil</button>
            <button className="btn btn-warning btn-sm ms-2" onClick={()=>handleDuzenle(kisi)}>Düzenle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}