import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import SelectedMovies from './Favorite';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [savedListId, setSavedListId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const popularMovieTitles = [
    'Harry Potter', 'Star Wars', 'Avengers', 'Lord of the Rings',
    'Batman', 'Spider-Man', 'Matrix', 'Titanic', 'Jurassic Park', 'Inception'
  ];

  useEffect(() => {
    const fetchRandomMovies = async () => {
      setIsLoading(true);
      const randomTitle = popularMovieTitles[Math.floor(Math.random() * popularMovieTitles.length)];
      const response = await fetch(`https://www.omdbapi.com/?s=${randomTitle}&apikey=a6d2cb5e`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 10));
      }
      setIsLoading(false);
    };

    fetchRandomMovies();
  }, []);

  const searchMovies = async (searchTerm) => {
    setIsLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a6d2cb5e`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    setIsLoading(false);
  };

  const addMovie = (movie) => {
    if (!selectedMovies.some(m => m.imdbID == movie.imdbID)) {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const removeMovie = (imdbID) => {
    setSelectedMovies(selectedMovies.filter(movie => movie.imdbID !== imdbID));
  };

  const saveList = (listName) => {
    if (selectedMovies.length == 0 || !listName) return;

    const id = 'list_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(id, JSON.stringify({
      name: listName,
      movies: selectedMovies
    }));
    setSavedListId(id);
  };

  return (
    <div className="container">
      <header>
        <h1>MOVIE WEBSITE</h1>
      </header>
      <div className="content">
        <div className="main-section">
          <SearchBar searchMovies={searchMovies} />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <MovieList 
              movies={movies} 
              addMovie={addMovie} 
              selectedMovieIds={selectedMovies.map(m => m.imdbID)} 
              isListSaved={!!savedListId}
            />
          )}
        </div>
        <div className="right-section">
          <SelectedMovies 
            movies={selectedMovies} 
            removeMovie={removeMovie} 
            saveList={saveList} 
            savedListId={savedListId} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home; 