import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MovieList from './pages/movieList';
import MovieInfo from './pages/movieInfo';
import './App.css'; // Certifique-se de que os estilos estão aqui

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Atualiza a classe do body com base no tema
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:genreId" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieInfo />} />
        <Route path="/" element={<Home key={window.location.pathname}/>} />
      </Routes>
    </div>
  );
}

export default App;
