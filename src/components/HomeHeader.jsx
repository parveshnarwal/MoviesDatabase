import React from 'react'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const HomeHeader = ({ update }) => {

    const { currentUser, logout } = useAuth()

    const navigate = useNavigate()

    function onSignOut(e) {
        e.preventDefault()
        try {
            logout()
            console.log('log out sucess')
            navigate('/login')
        }
        catch (e) {
            console.log('Error')
        }
    }

    return (
        <header>
            <h1><a href='/' className='header-link'>Movies DB</a></h1>
            <h1>{currentUser ? currentUser.email : ''}</h1>
            {currentUser ? <a className='header-link' href='/update-profile'>Update Profile</a> : ''}
            <input className='search' type='text' placeholder='Search...' onChange={(e) => update(e.target.value)}></input>
            <input type='button' value='Sign Out' className='sign-out-button' onClick={(e) => onSignOut(e)} />
        </header>
    )
}

export default HomeHeader