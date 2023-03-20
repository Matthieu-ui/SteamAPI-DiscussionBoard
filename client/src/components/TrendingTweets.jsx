import React, { useState, useEffect } from 'react';

function TrendingTweets() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    async function fetchTrends() {
      const response = await fetch('/api/trendingTweets');
      const data = await response.json();
      setTrends(data[0].trends);
    }

    fetchTrends();
  }, []);

  
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-medium mb-4">Trending Tweets</h2>
      <div className="flex flex-wrap">
        {trends.map((trend) => (
          <a
            key={trend.name}
            href={`https://twitter.com/search?q=${encodeURIComponent(
              trend.name
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mr-2 mb-2 hover:text-blue-700"
          >
            #{trend.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default TrendingTweets;