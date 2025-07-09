// app/api/urunler/route.js
// Ürün ekleme (POST) ve listeleme (GET) API endpoint'i

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // .env dosyanda MONGODB_URI olmalı
const dbName = 'urunlerDB'; // kendi veritabanı adını yaz

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

// Ürünleri listele
export async function GET() {
  const { db, client } = await connectDB();
  const urunler = await db.collection('urunler').find().toArray();
  client.close();
  return NextResponse.json(urunler);
}

// Ürün ekle
export async function POST(request) {
  const { db, client } = await connectDB();
  const data = await request.json();
  const result = await db.collection('urunler').insertOne(data);
  client.close();
  return NextResponse.json({ success: true, id: result.insertedId });
}