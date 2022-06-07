import './App.css';
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import searchIcon from './search.svg'

const api_url = `http://www.omdbapi.com/?i=tt3896198&apikey=ba344356`
const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
    console.log(data.Search)
  }

  useEffect(() => {
    getMovies('Avengers')
  }, [])

  return (
    <div className='header-con'>
      <h1>Filmy Info</h1>
      <div className='search'>
        <input 
          placeholder='Search for movies' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <img 
          src={searchIcon}
          alt="search"
          onClick={() => getMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0 ? (
          <div className='container'> 
            {movies.map((movie) => (
              <MovieCard movieData={movie}/>
            ))}
          </div>
        )
        :
        (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App