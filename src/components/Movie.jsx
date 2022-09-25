import React from 'react'

const Movie = ({ data }) => {

    const movieUrl = `https://www.imdb.com/title/${data.imdbID}/`

    return (
        <div className='movie'>
            <a href={movieUrl} target='_blank' rel='noreferrer'><img src={data.Poster} alt={data.Title} /></a>
            <div className="movie-info">
                <h3>{data.Title}</h3>
                <span>{data.Year}</span>
            </div>
            <div className='movier-over'>
                <h2>Overview</h2>
                <p>{data.Title}</p>
            </div>
        </div>
    )
}

export default Movie