// alta.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alta.css';

const API_KEY = 'eyJhdWQiOiIxMWRlN2I2MmNmMjRkNDRjNzliZTIxMjVhNGQwM2ZlOCIsIm5iZiI6MTc0Mjk0MzE2NC4xMzQsInN1YiI6IjY3ZTMzM2JjZWM5OGJmMGEwZDc1ZmMzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ';


export function fetchPopularMovies() {
  return axios
    .get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((response) => response.data.results)
    .catch((error) => {
      console.error('Erro ao carregar filmes populares:', error);
      throw error;
    });
}

function Alta() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies()
      .then((moviesData) => setMovies(moviesData))
      .catch((error) => console.error('Erro ao buscar filmes populares:', error));
  }, []);

  return (
    <div className="alta">
      <div className="emAlta">
        <div className="emAltaTitle">Em Alta</div>
      </div>
      <div className="container">
        <div className="wrapper">
          {movies.map((movie) => (
            <div className="filmes" key={movie.id}>
              <img
                className="cartaz"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="tools">
                <div className="nota">
                  <span>{movie.vote_average}</span>
                </div>
                <div className="buttons">
                  <button className="altaBtn">Detalhes</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alta;
