import React, { useEffect } from "react"
import Login from "../components/LoginForm"
import LoginForm from "../components/LoginForm"
import {Navigate, useNavigate} from 'react-router-dom'
import { useGlobalContext } from "../contexts/appcontext"


const LoginPage = () => {
    const { userInfo } = useGlobalContext()
    const navigate = useNavigate()
    
    useEffect(() => { 
       if (userInfo.isAuthenticated) { 
           navigate("/")
       }
    },[userInfo.isAuthenticated])
    return(
        <LoginForm />
    )
}

export default LoginPage