'use client';

import { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/API/news');
        const data = await response.json();

        if (response.ok) {
          setArticles(data);
        } else {
          setError(data.error || 'Gagal mengambil berita');
        }
      } catch (err) {
        setError('Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Memuat 100 berita...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">❌ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-black shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-white">
      NewsApp
        </h1>
      </div>
    </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <div
                  key={`${index}-${article.url}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col transform hover:-translate-y-1"
                >
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        const parent = img.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-48 bg-black flex items-center justify-center border border-gray-700';
                          fallback.innerHTML = '<span class="text-white text-5xl">📰</span>';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="bg-black rounded-xl shadow-md p-5 mt-6 border border-gray-800">
                      <span className="text-white text-5xl">📰</span>
                    </div>
                  )}
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {article.source.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h2 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                        {article.title}
                      </a>
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {article.description || 'Tidak ada deskripsi'}
                    </p>
                    
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-500 text-sm font-semibold hover:text-blue-700 mt-auto group"
                    >
                      Baca Selengkapnya
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-blue-500">
                <span className="text-xl">🔥</span>
                <h3 className="font-bold text-lg">Trending Topics</h3>
              </div>
              
              <ul className="space-y-3">
                {articles.slice(0, 5).map((article, idx) => (
                  <li key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-blue-500 hover:underline line-clamp-2 block"
                    >
                      {article.title}
                    </a>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {article.source.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

           <div className="bg-black rounded-xl shadow-md p-5 mt-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-2">📌 Tentang NewsApp</h3>
              <p className="text-sm opacity-90">
                Berita terbaru dari berbagai sumber di Amerika Serikat.
              </p>
              <p className="text-xs opacity-75 mt-3">
                Data provided by NewsAPI.org
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 NewsApp • Built with Next.js & Tailwind CSS
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Powered by NewsAPI.org | {articles.length} berita dimuat
          </p>
        </div>
      </footer>
    </div>
  );
}