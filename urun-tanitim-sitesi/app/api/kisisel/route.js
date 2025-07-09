// app/api/kisisel/route.js
// Kişisel tabloya kayıt ekleme (POST) ve listeleme (GET) API endpoint'i

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // .env dosyanda MONGODB_URI olmalı
const dbName = 'veriTabani'; // Veritabanı adı

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

// Kayıtları listele
export async function GET() {
  const { db, client } = await connectDB();
  const kisiler = await db.collection('kisisel').find().toArray();
  client.close();
  return NextResponse.json(kisiler);
}

// Kayıt ekle
export async function POST(request) {
  const { db, client } = await connectDB();
  const data = await request.json(); // { ad, soyad, telefon, mail, foto }
  const result = await db.collection('kisisel').insertOne(data);
  client.close();
  return NextResponse.json({ success: true, id: result.insertedId });
}

// Kayıt sil
export async function DELETE(request) {
  const { db, client } = await connectDB();
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    client.close();
    return NextResponse.json({ error: 'id parametresi gerekli' }, { status: 400 });
  }
  const { ObjectId } = await import('mongodb');
  await db.collection('kisisel').deleteOne({ _id: new ObjectId(id) });
  client.close();
  return NextResponse.json({ success: true });
}

// Kayıt güncelle
export async function PUT(request) {
  const { db, client } = await connectDB();
  const data = await request.json(); // { id, ad, soyad, telefon, mail, foto }
  const { id, ...updateData } = data;
  const { ObjectId } = await import('mongodb');
  await db.collection('kisisel').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  client.close();
  return NextResponse.json({ success: true });
}
