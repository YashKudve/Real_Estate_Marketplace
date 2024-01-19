import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    console.log(file)

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot)
        )

    }

    return (
        <div className='p-3, max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold uppercase text-center my-7'>Profile</h1>

            <form className='flex flex-col gap-4'>

                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*' />
                <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" />
                <input type="text" placeholder='Username' id='username' className='border p-3 rounded-lg' />
                <input type="text" placeholder='Email' id='email' className='border p-3 rounded-lg' />
                <input type="text" placeholder='Password' id='password' className='border p-3 rounded-lg' />

                <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
            </form>

            <div className='flex justify-between mt-5'>
                <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
                <span className="text-red-700 cursor-pointer font-semibold">Sign Out</span>
            </div>
        </div>
    )
}

export default Profile
