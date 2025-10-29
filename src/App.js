import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const searchBooks = async (term) => {
    setQuery(term);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes`,
        { params: { q: term, maxResults: 24 } }
      );
      setBooks(res.data.items || []);
    } catch (e) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bf-app">
      <header className="bf-header">
        <h1>Book Finder</h1>
        <p className="subtitle">Search books by title or author using Google Books API</p>
        <SearchBar onSearch={searchBooks} initialTerm={query} />
      </header>

      <main className="bf-content">
        {loading && (
          <div className="loader" aria-live="polite">Loading…</div>
        )}
        {error && !loading && (
          <div className="error" role="alert">{error}</div>
        )}
        {!loading && !error && (
          <div className="grid">
            {books.length === 0 ? (
              <div className="empty">
                {query ? 'No results found. Try a different search.' : '🔍 Start by searching for a book title or author above'}
              </div>
            ) : (
              books.map((b) => (
                <BookCard key={b.id} book={b} onViewMore={setSelected} />
              ))
            )}
          </div>
        )}
      </main>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <ModalContent book={selected} />
          </div>
        </div>
      )}
    </div>
  );
}

function ModalContent({ book }) {
  const info = book?.volumeInfo || {};
  const title = info.title || 'Untitled';
  const authors = info.authors && info.authors.length ? info.authors.join(', ') : 'Unknown Author';
  const description = info.description || 'No description available.';
  const publisher = info.publisher || 'Unknown Publisher';
  const publishedDate = info.publishedDate || 'Unknown Date';
  const previewLink = info.previewLink;

  return (
    <div className="modal-body">
      <h2 className="modal-title">{title}</h2>
      <p className="modal-authors">{authors}</p>
      <div className="modal-meta">
        <span><strong>Publisher:</strong> {publisher}</span>
        <span><strong>Published:</strong> {publishedDate}</span>
      </div>
      <div className="modal-desc" dangerouslySetInnerHTML={{ __html: description }} />
      {previewLink && (
        <a className="preview-link" href={previewLink} target="_blank" rel="noreferrer">Preview</a>
      )}
    </div>
  );
}

export default App;
