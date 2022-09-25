import React, { useRef, useState } from 'react'
import '../../src/SignUp.css'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const { resetPwd } = useAuth()

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {

        e.preventDefault()

        try {
            setLoading(true)
            await resetPwd(emailRef.current.value)
            console.log('Reset Successfull')
            setError('')
            alert('Check your mailbox for further instructions')
        }
        catch (err) {
            console.log(err)
            setError('Failed: Error occured while resetting password.')
            alert('LogIn Failed. Please retry')
        }

        setLoading(false)

    }

    return (
        <>
            <form className='sign-up-form-container' onSubmit={(e) => handleSubmit(e)}>
                <h1>Forgot Password</h1>
                <input type='text' placeholder='Email' ref={emailRef}></input>
                <input type='submit' value='Reset Password' className='submit-button' disabled={loading}></input>
                <div className='sign-up-page-footer'>
                    <a href='/login'>Log In</a>
                    <a href='https://google.com'>Need Help?</a>
                </div>
            </form>
        </>
    )
}
export default ForgotPassword