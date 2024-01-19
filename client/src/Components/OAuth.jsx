import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

function OAuth() {

    const handleGoogleClick = async () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })

            })

            const data = res.json()
            dispatch(signInSuccess(data));
            navigate('/')

        } catch (error) {
            console.log("Sign in with Google Failed", error)
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-85'>Continue with google</button>
    )
}

export default OAuth
