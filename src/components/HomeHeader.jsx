import React from 'react'

const HomeHeader = ({ update }) => {
    return (
        <header>
            <h1>Movies DB</h1>
            <input className='search' type='text' placeholder='Search...' onChange={(e) => update(e.target.value)}></input>
        </header>
    )
}

export default HomeHeader