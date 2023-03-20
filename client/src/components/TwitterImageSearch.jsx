import React, { useState } from 'react';
import axios from 'axios';

function TwitterImageSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/images', {
        params: {
          q: query,
          category: category,
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="query-input">Search query:</label>
        <input
          type="text"
          id="query-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category-input">Category:</label>
        <input
          type="text"
          id="category-input"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {images.map((image) => (
        <div
        className='pl-2 pr-2 pb-2 m-3 rounded-md drop-shadow-md max-w-sm'
        key={image.id}>
          <img src={image.url} alt={image.tags} />
        </div>
      ))}
    </div>
  );
}

export default TwitterImageSearch;