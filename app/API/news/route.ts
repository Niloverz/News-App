import { NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      return NextResponse.json({ error: 'API Key tidak ditemukan' }, { status: 500 });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=100`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'error') {
      return NextResponse.json({ error: data.message }, { status: 500 });
    }
    
    return NextResponse.json(data.articles);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil berita' }, { status: 500 });
  }
}