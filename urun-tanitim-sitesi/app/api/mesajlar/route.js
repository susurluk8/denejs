// app/api/mesajlar/route.js
// İletişim mesajı ekleme (POST) ve listeleme (GET) API endpoint'i

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'veriTabani';

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

// Mesajları listele
export async function GET() {
  const { db, client } = await connectDB();
  const mesajlar = await db.collection('mesajlar').find().toArray();
  client.close();
  return NextResponse.json(mesajlar);
}

// Mesaj ekle
export async function POST(request) {
  const { db, client } = await connectDB();
  const data = await request.json(); // { ad, soyad, mail, mesaj }
  const result = await db.collection('mesajlar').insertOne({ ...data, cevap: null });
  client.close();
  return NextResponse.json({ success: true, id: result.insertedId });
}

// Mesaj güncelle (cevap ekle)
export async function PUT(request) {
  const { db, client } = await connectDB();
  const data = await request.json(); // { id, cevap }
  const { id, cevap } = data;
  const { ObjectId } = await import('mongodb');
  await db.collection('mesajlar').updateOne(
    { _id: new ObjectId(id) },
    { $set: { cevap } }
  );
  client.close();
  // Burada mail gönderme işlemi yapılabilir (nodemailer ile)
  return NextResponse.json({ success: true });
}
