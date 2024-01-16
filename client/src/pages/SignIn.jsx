import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {

    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent refresing the page while submitting response

        try {
            setLoading(true);
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }); //proxy server set at 'vite.config,js'
            const data = await res.json();

            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }

            setLoading(false);
            setError(null);
            navigate('/')
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }


        // console.log(data)
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                {/* <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange} /> */}
                <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-50'>{loading ? 'Loading...' : 'Sign In'}</button>
            </form>

            <div className="p-3 flex gap-2">
                <p>Create new account?</p>
                <Link to={'/signup'}>
                    <span className='text-blue-700'>Sign Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignIn
