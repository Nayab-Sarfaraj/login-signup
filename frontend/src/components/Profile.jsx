import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const getMyProfile = async () => {
        try {
            const { data } = await axios("/me")
            if (!data.success) navigate("/login")
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogout = async () => {
        try {
            const { data } = await axios("/logout")
            if (data.success) navigate("/login")
            setUser({})
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMyProfile()
    }, [])
    return (
        <div className='h-screen w-full flex items-center justify-center bg-slate-950'>
            {user?.name ? <div className='text-center'>
                <h1 className='text-2xl font-bold text-white  capitalize '>{user?.name}</h1>
                <h1 className='text-xl font-bold text-white  italic my-5    '>{user?.email}</h1>
                <button className='px-5 py-2 bg-red-700 text-white font-semibold' onClick={handleLogout} >Logout</button>
            </div> : <Link to={'/login'}><button className='px-5 py-2 bg-red-700 text-white font-semibold' onClick={handleLogout} >Login </button></Link>}
        </div>
    )
}

export default Profile