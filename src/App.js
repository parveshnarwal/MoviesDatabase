import { useEffect, useState } from 'react';
import './App.css';
import HomeHeader from './components/HomeHeader';
import LoadingSpinner from './components/LoadingSpinner';
import './components/Movie'
import Movie from './components/Movie';

function App() {

  const [movies, setMovies] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [query, setQuery] = useState('breaking')
  const [tooManyResults, setTooManyResults] = useState('false')

  useEffect(() => {
    const timer = setTimeout(() => {
      let url = `http://www.omdbapi.com/?s=${query}&type=movie&apikey=38890dae`

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => { setMoviesData(data) })
    }, 1000)

    return () => clearTimeout(timer)
  }, [query])


  function setMoviesData(data) {

    console.log(data)

    if ('Search' in data) {
      setMovies(data.Search)
      setTooManyResults(false)
    }

    else if ('Error' in data) {
      if (data.Error === "Too many results.") {
        setTooManyResults(true)
        setMovies([])
      }

      else if (data.Error === "Movie not found!") {
        setTooManyResults(false)
        setMovies([])
      }
    }

    else {
      setTooManyResults(false)
      setMovies([])
    }

    setLoadingData(false)
  }

  function updateQuery(s) {
    s = s.trim().replace(' ', '%20')

    if (s.length === 0 && movies.length == 0) s = 'breaking'
    if (s.length < 3) return

    setLoadingData(true)
    setQuery(s)
  }

  const dataToRender = () => {
    if (loadingData) return <LoadingSpinner />
    else if (!loadingData && movies.length === 0 && !tooManyResults) return <h1>No data to display yet</h1>
    else if (!loadingData && movies.length === 0 && tooManyResults) return <h1>Oops! Too many records found</h1>
    else if (!loadingData && movies.length > 0) return movies.map((movie) => (<Movie data={movie} key={movie.imdbID} />))
    else return <h1>No project match</h1>
  }

  return (
    <>
      <HomeHeader update={updateQuery} />
      <div className='movie-container'>
        {dataToRender()}
      </div>
    </>
  );
}

export default App;
