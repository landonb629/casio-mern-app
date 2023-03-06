import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => { 

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    // function that checks if the username cookie is present in the browser
    const checkAuthentication = async () => { 
        const userCookie = Cookies.get('username')
        // if cookie is not present, set the user state value to null
        if (!userCookie) { 
            console.log('user is not authenticated')
            setUser('null')

        } else { 
            console.log('user is authenticated')
        }
        
    }

    useEffect(()=> { 
        // if user is null, navigate to the login page
        checkAuthentication()
        if (user === 'null') { 
            navigate("/login")
        }
    },[navigate])
    return(
        <div>Home page</div>
    )
}

export default Home