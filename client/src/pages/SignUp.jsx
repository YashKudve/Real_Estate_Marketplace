import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-5'>
                <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' />
                <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' />
                <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' />

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign up</button>
            </form>

            <div className="p-3 flex gap-2">
                <p>Already have an account?</p>
                <Link to={'/signin'}>
                    <span className='text-blue-700'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp
