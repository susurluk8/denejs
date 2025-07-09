'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProjeDetayPage() {
  const params = useParams();
  const { id } = params;
  const [kisi, setKisi] = useState(null);

  useEffect(() => {
    fetch('/api/kisisel')
      .then(res => res.json())
      .then(data => {
        const bulunan = data.find(k => k._id === id);
        setKisi(bulunan);
      });
  }, [id]);

  if (!kisi) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1>{kisi.ad} {kisi.soyad}</h1>
      {kisi.foto && <img src={kisi.foto} alt="foto" style={{width:200, borderRadius:12}} />}
      <p><b>Telefon:</b> {kisi.telefon}</p>
      <p><b>Mail:</b> {kisi.mail}</p>
    </div>
  );
}
