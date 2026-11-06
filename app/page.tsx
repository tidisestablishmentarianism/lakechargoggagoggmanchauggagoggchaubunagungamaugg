'use client';

import { useState, useEffect } from 'react';

type Article = {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch articles', err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setTitle('');
        setContent('');
        setIsOpen(false);
        fetchArticles();
      }
    } catch (err) {
      console.error('Failed to create article', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-red-100 pb-12">
      <div className="flex flex-row px-24 py-4 justify-between sm:flex-row bg-red-500 items-center text-white">
        <h1 className="font-bold text-lg">
          Мой сайт
        </h1>
        <div className="flex flex-row gap-4 px-24 items-center">
          <span>Button1</span>
          <span>Button2</span>
          <span>Button3</span>
          <span>Button4</span>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white text-red-500 px-4 py-2 rounded font-medium hover:bg-red-50 transition"
          >
            Добавить статью
          </button>
        </div>
      </div>
      <p className="px-20 pt-10 text-xl font-semibold">
        Digital решения для Вашего успеха
      </p>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddArticle} className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl flex flex-col gap-4">
            <h2 className="text-lg font-bold">Новая статья (SQLite)</h2>
            <input
              type="text"
              placeholder="Заголовок статьи"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
            <textarea
              placeholder="Содержимое статьи"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded w-full h-32"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="px-20 pt-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Список статей из базы данных</h2>
        {articles.length === 0 ? (
          <p className="text-gray-600">Статей пока нет.</p>
        ) : (
          articles.map((art) => (
            <div key={art.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">{art.title}</h3>
              <p className="text-gray-700 mt-2">{art.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
