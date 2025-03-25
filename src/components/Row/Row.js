import React, { useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import "../Row/Row.css";
import axios from "../../axios.js";
import MovieIdContext from '../../Context.js';
import { ApiKey } from '../../Requests.js';


function Row({ isLargeRow = false, fetchUrl, title }) {
  const [movies, setMovies] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const {setMovieId} = useContext(MovieIdContext)
  const navigate = useNavigate();

  const handleClick = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${ApiKey}&language=en-US'`).then((res) => {
      if (res.data.results.length !== 0) {
           setMovieId(res.data.results[0])
      }
    })
  }


  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        setIsLoading(true);
        const request = await axios.get(fetchUrl);
        if (isMounted) {
          setMovies(request.data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setMovies([]); 
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
       isMounted = false; 
    };
  }, [fetchUrl]);

 
  if (isLoading) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__loading">Loading...</div>
      </div>
    );
  }

 
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
                onClick={()=>{handleClick(movie.id)
                  navigate("/player")
                }}
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