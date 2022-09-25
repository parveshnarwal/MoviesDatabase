import React, { useRef, useState } from 'react'
import '../../src/SignUp.css'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const navigate = useNavigate()

    const { signUp, currentUser } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {

        e.preventDefault()

        if (passwordRef.current.value != passwordConfirmRef.current.value) return setError('Password do not match')

        try {
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            console.log('Register Sccessful')
            navigate('/')
            setError('')
        }
        catch (err) {
            console.log(err)
            setError('Failed. Account can not be created.')
            alert(`Registration failed. ${err.Message}`)
        }

        setLoading(false)

    }

    return (
        <>
            <form className='sign-up-form-container' onSubmit={(e) => handleSubmit(e)}>
                <h1>Sign Up</h1>
                <input type='text' placeholder='Email' ref={emailRef}></input>
                <input type='password' placeholder='Password' ref={passwordRef}></input>
                <input type='password' placeholder='Confirm Password' ref={passwordConfirmRef}></input>
                <input type='submit' value='Register' className='submit-button' disabled={loading}></input>
                <div className='sign-up-page-footer'>
                    <a href='/login'>Log In</a>
                    <a href='https://google.com'>Need Help?</a>
                </div>
            </form>
        </>
    )
}

export default SignUp