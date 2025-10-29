import React from 'react';

const FALLBACK_COVER =
  'https://via.placeholder.com/128x192.png?text=No+Cover';

function BookCard({ book, onViewMore }) {
  const info = book.volumeInfo || {};
  const thumbnail =
    (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) ||
    FALLBACK_COVER;
  const title = info.title || 'Untitled';
  const authors = info.authors && info.authors.length ? info.authors.join(', ') : 'Unknown Author';

  return (
    <div className="book-card" role="button" tabIndex={0} onClick={() => onViewMore(book)} onKeyDown={(e) => { if (e.key === 'Enter') onViewMore(book); }}>
      <div className="cover-wrap">
        <img src={thumbnail} alt={title} loading="lazy" />
      </div>
      <div className="book-meta">
        <h3 title={title}>{title}</h3>
        <p className="authors" title={authors}>{authors}</p>
        <button className="view-more" onClick={(e) => { e.stopPropagation(); onViewMore(book); }}>View More</button>
      </div>
    </div>
  );
}

export default BookCard;
