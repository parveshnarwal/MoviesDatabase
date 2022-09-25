import React, { useRef, useState } from 'react'
import '../../src/SignUp.css'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const navigate = useNavigate()

    const { updateUserEmail, updateUserPassword, currentUser } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) return setError('Password do not match')

        try {
            setLoading(true)
            if (currentUser.email !== emailRef.current.value) await updateUserEmail(emailRef.current.value)

            if (passwordRef.current.value.length !== 0) await updateUserPassword(passwordRef.current.value)

            alert('Update Successful')
            navigate('/')
            setError('')
        }
        catch (err) {
            console.log(err)
            setError('Failed. Account can not be updated.')
            alert(`Registration failed. ${err.Message}`)
        }

        setLoading(false)

    }

    return (
        <>
            <form className='sign-up-form-container' onSubmit={(e) => handleSubmit(e)}>
                <h1>Update Profile</h1>
                <input type='text' placeholder='Email' ref={emailRef} required defaultValue={currentUser.email} />
                <input type='password' placeholder='Leave password empty if do not want to change' ref={passwordRef}></input>
                <input type='password' placeholder='Leave confirm password empty if do not want to change' ref={passwordConfirmRef}></input>
                <input type='submit' value='Update' className='submit-button' disabled={loading}></input>
                <div className='sign-up-page-footer'>
                    <a href='/'>Cancel</a>
                </div>
            </form>
        </>
    )
}

export default UpdateProfile