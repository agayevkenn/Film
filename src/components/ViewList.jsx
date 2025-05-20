import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ViewList() {
  const { id } = useParams();
  const [listData, setListData] = useState({ name: '', movies: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedList = async () => {
      setIsLoading(true);
      const savedList = localStorage.getItem(id);
      if (savedList) {
        setListData(JSON.parse(savedList));
      }
      setIsLoading(false);
    };

    fetchSavedList();
  }, [id]);

  if (isLoading) {
    return <div>Loading saved list...</div>;
  }

  return (
    <div className="view-list-container">
      <h1>{listData.name || 'Saved Movie List'}</h1>
      
      {listData.movies?.length == 0 ? (
        <p>No movies in this list or list not found.</p>
      ) : (
        <div className="saved-movies">
          {listData.movies?.map(movie => (
            <div className="saved-movie" key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <a 
                href={`https://www.imdb.com/title/${movie.imdbID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="imdb-link"
              >
                View on IMDB
              </a>
            </div>
          ))}
        </div>
      )}
      
      <Link to="/" className="back-link">Back to Search</Link>
    </div>
  );
}

export default ViewList;