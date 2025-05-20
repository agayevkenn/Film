import React from "react";

function MovieList({ movies, addMovie, selectedMovieIds, savedMovieIds = [], isListSaved = false }) {
  return (
    <div className="movie-list">
      {movies.length == 0 ? (
        <p>No movies found. Try searching for a movie title.</p>
      ) : (
        movies.map((movie) => {
          const isInSavedList = savedMovieIds && savedMovieIds.includes(movie.imdbID);
          const isSelected = selectedMovieIds.includes(movie.imdbID);
          const isDisabled = isSelected || isInSavedList || isListSaved;
          
          return (
            <div className="movie-card" key={movie.imdbID}>
              <div className="movie-poster">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/150x225?text=No+Image"
                  }
                  alt={movie.Title}
                />
              </div>
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>Year: {movie.Year}</p>
                <button
                  onClick={() => addMovie(movie)}
                  className="add-btn"
                  disabled={isDisabled}
                  style={{ backgroundColor: isDisabled ? "gray" : "" }}
                >
                  {isListSaved ? "List Saved" : isInSavedList ? "In Saved List" : isSelected ? "Added" : "Favorite"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MovieList;