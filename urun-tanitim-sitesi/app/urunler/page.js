'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Ürünler (Projeler) sayfası. Ürün veya projelerin listelendiği sayfa.
export default function ProductsPage() {
  const [kisiler, setKisiler] = useState([]);

  useEffect(() => {
    fetch('/api/kisisel')
      .then(res => res.json())
      .then(data => setKisiler(data));
  }, []);

  return (
    <div>
      <h1>Ürünler</h1>
      <p>Burada ürünler veya projeler listelenecek.</p>
      <div className="row">
        {kisiler.map((kisi) => (
          <div key={kisi._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              {kisi.foto && <img src={kisi.foto} className="card-img-top" alt={kisi.ad} style={{height:200, objectFit:'cover'}} />}
              <div className="card-body">
                <h5 className="card-title">{kisi.ad} {kisi.soyad}</h5>
                <Link href={`/urunler/${kisi._id}`} className="btn btn-outline-primary mt-2">Detay</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
