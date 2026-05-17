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
        <p className="text-gray-500">Memuat berita...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            News
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {article.source.name} • {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                </p>
                <h2 className="font-bold text-lg mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.description || 'Tidak ada deskripsi'}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}