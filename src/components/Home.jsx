import { useEffect, useState } from 'react';
import HomeHeader from './HomeHeader';
import LoadingSpinner from './LoadingSpinner';
import Movie from './Movie';

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loadingData, setLoadingData] = useState(true)
    const [query, setQuery] = useState('breaking')
    const [tooManyResults, setTooManyResults] = useState('false')

    const imdbKey = process.env.REACT_APP_IMDB_API_KEY

    useEffect(() => {
        const timer = setTimeout(() => {
            let url = `http://www.omdbapi.com/?s=${query}&type=movie&apikey=${imdbKey}`

            fetch(url)
                .then((resp) => resp.json())
                .then((data) => { setMoviesData(data) })
        }, 1000)

        return () => clearTimeout(timer)
    }, [query])


    function setMoviesData(data) {

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

        if (s.length === 0 && movies.length === 0) s = 'breaking'
        if (s.length < 3) return

        setLoadingData(true)
        setQuery(s)
    }

    const dataToRender = () => {
        if (loadingData) return <LoadingSpinner />
        else if (!loadingData && movies.length === 0 && !tooManyResults) return <h1>No data to display yet</h1>
        else if (!loadingData && movies.length === 0 && tooManyResults) return <h1>Oops! Too many records found</h1>
        else if (!loadingData && movies.length > 0) return movies.map((movie) => (<Movie data={movie} key={movie.imdbID} />))
        else return <h1>Some thing went wrong</h1>
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

export default Home