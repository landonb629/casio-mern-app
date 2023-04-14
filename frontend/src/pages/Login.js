import React from "react"
import Login from "../components/Login"
import {Navigate, useNavigate} from 'react-router-dom'
import { useGlobalContext } from "../contexts/appcontext"

const LoginPage = () => {
    const {userInfo, setUserInfo} = useGlobalContext()
    const navigate = useNavigate()

    const Login = () => { 
        
        setUserInfo({...userInfo, isAuthenticated: true})
        navigate("/")
    }
    return <>
        <h2>login page</h2>
        <button onClick={()=>Login()}>Login</button>
    </>
}

export default LoginPage