// app/api/kisisel/upload/route.js
// Fotoğraf dosyası yükleme API route'u
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) return NextResponse.json({ error: 'Dosya yok' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  // Klasör yoksa oluşturulmalı (ilk yüklemede elle oluşturabilirsin)
  const filePath = path.join(uploadDir, file.name);

  await writeFile(filePath, buffer);

  // Sunucudan erişilebilecek yol
  const url = `/uploads/${file.name}`;
  return NextResponse.json({ url });
}
