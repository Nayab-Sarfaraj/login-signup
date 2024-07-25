import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                toast.error("all field should be filled")
                return

            }
            const { data } = await axios.post("/login", { email, password })
            console.log(data)
            if (data.success) {
                toast.success("login successfully")
                navigate("/profile")
            }
            else toast.error("something went wrong")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-slate-900'>


            <div className='bg-blue-900 px-10 h-[50%] flex flex-col items-center justify-center'>
                <h1 className='text-white text-2xl font-bold mb-5 text-center'>Login</h1>
                <form className='flex flex-col gap-7'>
                    <input placeholder='Email' type='email' className='px-2 py-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder='Password' className='px-2 py-2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='px-5 py-2 bg-black text-white font-semibold' onClick={handleSubmit} >Submit</button>
                    <Link to={"/register"} className='text-center'>New user ? register</Link>
                </form>
            </div>
        </div>
    )
}

export default Login