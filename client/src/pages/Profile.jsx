import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js';

function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadErr, setFileUploadErr] = useState(false)
    const [formData, setFormData] = useState({})
    // console.log(formData)
    // console.log(filePerc)
    // console.log(fileUploadErr)

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
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% complete')
                setFilePerc(Math.round(progress))
            },
            (error) => {
                setFileUploadErr(true)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then
                    ((downloadURL) => {
                        setFormData({ ...formData, avatar: downloadURL })
                    })
            }
        );


    }

    return (
        <div className='p-3, max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold uppercase text-center my-7'>Profile</h1>

            <form className='flex flex-col gap-4'>

                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*' />
                <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" />
                <p className='self-center'>
                    {fileUploadErr ? (
                        <span className='text-red-700'>Failed to upload image</span>) :
                        filePerc > 0 && filePerc < 100 ? (
                            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>) :
                            filePerc === 100 ? (
                                <span className='text-green-700 font-semibold text-center'>Image Uploaded Successfully !</span>) : (""
                            )

                    }
                </p>

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
