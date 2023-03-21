import React, { useState } from 'react';
import axios from 'axios';
import BanList from './BanList';

function TwitterImageSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showImagesOnly, setShowImagesOnly] = useState(false);

  const [bannedUsers, setBannedUsers] = useState([]);
  const [bannedWords, setBannedWords] = useState([]);
  const [bannedHashtags, setBannedHashtags] = useState([]);
  const [bannedPhrases, setBannedPhrases] = useState([]);


  


  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    axios.get(`http://localhost:5173/api/imagesearch/${search}`)
      .then(res => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      });
  };

  const handleShowImagesOnly = () => {
    setShowImagesOnly(true);
  };

  const handleShowAllTweets = () => {
    setShowImagesOnly(false);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4 px-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-fit w-fit" onSubmit={handleSubmit}>
          <input
            className="rounded border border-gray-400 p-2 flex-auto"
            type="text" value={search} onChange={handleChange} />


          <div className="flex flex-wrap">
            <ul
            className="p-4">
            Filter:
              <li>
                <input className="rounded border border-gray-400 " type="checkbox" checked={showImagesOnly} onChange={handleShowImagesOnly} />
                <label>Show Images Only</label>
              </li>
              <li>
              <input className="rounded border border-gray-400 " type="checkbox" checked={!showImagesOnly} onChange={handleShowAllTweets} />
              <label>Show All Tweets</label>
              </li>
            </ul>
          </div>
          {/* ENTER SUBMIT */}
          <button
            className="rounded border border-gray-400 p-2 m-2 hover:bg-gray-400 drop-shadow-lg"
            type="submit">Search</button>


        </form>


        <BanList
        bannedUsers={bannedUsers}
        bannedWords={bannedWords}
        bannedHashtags={bannedHashtags}
        bannedPhrases={bannedPhrases}
        setBannedUsers={setBannedUsers}
        setBannedWords={setBannedWords}
        setBannedHashtags={setBannedHashtags}
        setBannedPhrases={setBannedPhrases}
        search={search}


      />


      </div>

      <div className="text-center w-full md:w-3/4 px-4 flex-1">
        <h1 className="text-4xl font-bold text-gray-800">Twitter Image Search</h1>
        




        {loading && <p>Loading...</p>}
        {error && <p>There was an error</p>}
        {results.map(result => {
          if (showImagesOnly && (!result.media || result.media.length === 0)) {
            return null;
          }
          return (
            <div className='w-1/2 p-4 mx-auto border m-4 bg-slate-400' key={result.id}>
              <img className='rounded-full border border-gray-400 m-2' src={result.urls.small} alt={result.alt_description} />
              <div className='text-xl font-bold text-gray-800'>
                <span className="text-2xl font-bold underline underline-offset-4 text-gray-800">
                  {result.user.name}
                </span>
                <span className="text-xl font-thin text-gray-800 underline underline-offset-4">
                  @{result.user.screen_name}
                </span>
              </div>
              <p className="text-gray-800 p-3">{result.alt_description}</p>
              {result.media && result.media.length > 0 && (
                <img className="rounded border border-gray-400" src={result.media[0].media_url} alt={result.alt_description} />
              )}
            </div>
          );
        })}
      </div>
    </div>






  );
}

export default TwitterImageSearch;
