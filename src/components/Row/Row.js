import React, { useEffect, useState } from 'react';
import "../Row/Row.css";
import axios from "../../axios.js";

function Row({ isLargeRow = false, fetchUrl, title }) {
  const [movies, setMovies] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount

    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await axios.get(fetchUrl);
        if (isMounted) {
          setMovies(request.data.results || []); // Fallback to empty array
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setMovies([]); // Set empty array on error
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [fetchUrl]);

  // Loading state
  if (isLoading) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__loading">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className='row'>
      {isLargeRow && <h1>Movies</h1>}
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.length > 0 ? (
          movies.map((movie) => (
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
              <img 
                className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`} 
                alt={movie?.title || movie?.name || movie?.original_name || 'Movie'}
                key={movie.id}
                loading="lazy"
              />
            )
          ))
        ) : (
          <div className="row__empty">No movies found</div>
        )}
      </div>
    </div>
  );
}

export default Row;