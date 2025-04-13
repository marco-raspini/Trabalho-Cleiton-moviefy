import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

import Logo from '../images/Cinemax.png';
import PopCorn from '../images/pop-corn.png';


const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWRlN2I2MmNmMjRkNDRjNzliZTIxMjVhNGQwM2ZlOCIsIm5iZiI6MTc0Mjk0MzE2NC4xMzQsInN1YiI6IjY3ZTMzM2JjZWM5OGJmMGEwZDc1ZmMzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZ9mlvBCiqGiX2exCjthB6cwtJdVCC13HLgEgVw4FwQ';
const MOVIE_API_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

const categories = [
  { id: 28, name: 'Ação' },
  { id: 35, name: 'Comédia' },
  { id: 27, name: 'Terror' },
  { id: 18, name: 'Drama' },
  { id: 53, name: 'Suspense' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Ficção Científica' },
  { id: 12, name: 'Aventura' },
  { id: 14, name: 'Fantasia' },
  { id: 16, name: 'Animação' },
  { id: 10751, name: 'Familia' },
  { id: 80, name: 'Crime' },
  { id: 10402, name: 'Musica' },
  { id: 9648, name: 'Misterio' }
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  const fetchMovies = async () => {
    try {
      const randomPage = Math.floor(Math.random() * 30) + 1; // Pega página de 1 a 100

      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${randomPage}`, {
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      });

      setMovies(response.data.results);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setError('Erro ao buscar filmes');
      setLoading(false);
    }
  };


  // Função para escolher aleatoriamente 3 filmes
  const getRandomMovies = () => {
    if (movies.length > 0) {
      const shuffled = [...movies].sort(() => 0.5 - Math.random()); // Embaralha os filmes
      const selectedMovies = shuffled.slice(0, 3); // Seleciona os 3 primeiros
      setCurrentMovies(selectedMovies); // Atualiza os filmes exibidos
    }
  };

  useEffect(() => {
    fetchMovies(); // Carregar filmes na primeira vez

    // Intervalo para trocar de filme a cada 10 segundos
    const interval = setInterval(() => {
      getRandomMovies(); // Chama a função para pegar 3 filmes aleatórios
    }, 10000); // 10 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []); // Este useEffect é chamado apenas uma vez, quando o componente é montado

  useEffect(() => {
    // Verifica se há filmes e escolhe 3 filmes aleatórios após o carregamento
    if (movies.length > 0) {
      getRandomMovies(); // Escolhe os primeiros 3 filmes ao carregar
    }
  }, [movies]); // Esta dependência garante que a função só será chamada quando "movies" for atualizado

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando filmes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  const coresCategorias = [
    '#FF0000', // Vermelho
    '#1F73BC', // Laranja
    '#2B6328', // Marrom
    '#B58121', // Preto
    '#731F49', // Preto
    '#5AAEBF', // Rosa
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <img src={Logo} className="logo" alt="Logo" />
          <h2>Movify</h2>
        </div>

        <div className="alta">
          <div className="emAlta">Recomendados</div>
          <div className="filmes">
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <div key={movie.id}>
                  <div className="cartaz">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="destaque-img"
                      />
                    </Link>
                  </div>
                  <div className="tools">
                    <div className="titulo">{movie.title}</div>
                    <div className="nota">
                      <img className="popcorn" src={PopCorn} alt="Pipoca" />
                      <p>{movie.vote_average}/10</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Sem filmes para exibir no momento.</p>
            )}
          </div>
        </div>

        <div className="explorar">
          <h4>Explore novas aventuras:</h4>
          <div className="categories-list">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/movies/${category.id}`} className="category-link">
                <button
                  style={{
                    backgroundColor: coresCategorias[index % coresCategorias.length],
                  }}
                  className="category-button"
                >
                  #{category.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
