import React, { useState } from "react";
import { Link } from "react-router-dom";

function Favorite({ movies, removeMovie, saveList, savedListId }) {
  const [listName, setListName] = useState("");
  const [savedName, setSavedName] = useState("");

  const handleSaveList = () => {
    if (listName.trim()) {
      saveList(listName);
      setSavedName(listName);
    }
  };

  return (
    <div className="selected-movies">
      <h2>Selected Movies</h2>

      {movies.length == 0 ? (
        <p>No movies selected yet.</p>
      ) : (
        <>
          {movies.map((movie) => (
            <div className="selected-movie" key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              {!savedListId && (
                <button
                  onClick={() => removeMovie(movie.imdbID)}
                  className="remove-btn"
                ></button>
              )}
            </div>
          ))}

          {savedListId ? (
            <Link to={`/list/${savedListId}`} className="saved-link">
              View Saved List
            </Link>
          ) : (
            <div className="save-list-form">
              <input
                type="text"
                placeholder="List name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="list-name-input"
                disabled={savedListId}
              />
              <button
                onClick={handleSaveList}
                className="save-btn"
                disabled={!listName.trim() || movies.length == 0 || savedListId}
              >
                Save List
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Favorite;
