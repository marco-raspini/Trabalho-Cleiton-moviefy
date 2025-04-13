import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Altere para useNavigate
import axios from 'axios';
import './movieinfos.css';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWRlN2I2MmNmMjRkNDRjNzliZTIxMjVhNGQwM2ZlOCIsIm5iZiI6MTc0Mjk0MzE2NC4xMzQsInN1YiI6IjY3ZTMzM2JjZWM5OGJmMGEwZDc1ZmMzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZ9mlvBCiqGiX2exCjthB6cwtJdVCC13HLgEgVw4FwQ'; // Não se esqueça de substituir pela sua chave de API

function MovieInfo() {
  const { movieId } = useParams();
  const navigate = useNavigate(); // Use o hook useNavigate
  const [movie, setMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    try {
      const response = await axios.get(url, { headers });
      const movieDetails = response.data;
      setMovie(movieDetails);

      // Chama a função para pegar o vídeo do trailer
      const videoUrl = await getVideoUrl(movieId);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoUrl = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=pt-BR`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    try {
      const response = await axios.get(url, { headers });
      const videos = response.data.results;
      const trailer = videos.find((v) => v.site === 'YouTube');
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="movie-info-container">
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <p><strong>Data de Lançamento:</strong> {movie.release_date}</p>
          <p><strong>Nota:</strong> {movie.vote_average}</p>

          {videoUrl ? (
            <div>
              <h2>Trailer:</h2>
              <iframe
                width="560"
                height="315"
                src={videoUrl.replace('watch?v=', 'embed/')}
                title="Trailer do filme"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>Trailer indisponível.</p>
          )}

          <button onClick={() => navigate('/')}>Voltar para Home</button> {/* Botão para voltar à home */}
        </>
      )}
    </div>
  );
}

export default MovieInfo;
