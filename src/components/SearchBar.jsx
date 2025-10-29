import React, { useState } from 'react';

function SearchBar({ onSearch, initialTerm = '' }) {
  const [term, setTerm] = useState(initialTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search books"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
