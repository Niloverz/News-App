import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY;

export async function GET(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json({ error: 'API Key tidak ditemukan' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    let url: string;
    
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&pageSize=100&language=en`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=100`;
    }
    
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