import React from "react"
import Login from "../components/LoginForm"
import LoginForm from "../components/LoginForm"
import {Navigate, useNavigate} from 'react-router-dom'
import { useGlobalContext } from "../contexts/appcontext"

const LoginPage = () => {
    const {userInfo, setUserInfo} = useGlobalContext()
    const navigate = useNavigate()

    const Login = () => { 
        setUserInfo({...userInfo, isAuthenticated: true})
        navigate("/")
    }
    
    return(
        <LoginForm />
    )
       

}

export default LoginPage