import React, { useRef, useState } from 'react'
import '../../src/SignUp.css'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const { login, googleLogIn } = useAuth()

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {

        e.preventDefault()

        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            console.log('Log In Successfull')
            setError('')
            navigate('/')
        }
        catch (err) {
            console.log(err)
            setError('Failed: Error occured while logging in.')
            alert('LogIn Failed. Please retry')
        }

        setLoading(false)

    }

    async function handleGoogleLogIn(e) {

        e.preventDefault()

        try {
            setLoading(true)
            await googleLogIn()
            console.log('Log In Successfull')
            setError('')
            navigate('/')
        }
        catch (err) {
            console.log(err)
            setError('Failed: Error occured while logging in using google.')
            alert('LogIn Failed. Please retry')
        }

        setLoading(false)

    }

    return (
        <>
            <form className='sign-up-form-container'>
                <h1>Log In</h1>
                <input type='text' placeholder='Email' ref={emailRef}></input>
                <input type='password' placeholder='Password' ref={passwordRef}></input>
                <input type='submit' value='Log In' className='submit-button' onClick={(e) => handleSubmit(e)} disabled={loading}></input>
                <input type='submit' value='Google Sign In' className='submit-button' onClick={(e) => handleGoogleLogIn(e)} disabled={loading}></input>
                <div className='sign-up-page-footer'>
                    <a href='/signup'>Register</a>
                    <a href='/forgot-password'>Forgot Password?</a>
                </div>
            </form>
        </>
    )
}

export default Login