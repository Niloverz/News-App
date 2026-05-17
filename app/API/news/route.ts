import { NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY;

export async function GET() {
  try {
    const url = `https://newsapi.org/v2/everything?q=indonesia&apiKey=${API_KEY}&pageSize=20&language=en`;
    
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