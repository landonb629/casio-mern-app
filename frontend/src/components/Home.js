import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => { 

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    // function that checks if the username cookie is present in the browser
    const checkAuthentication = async () => { 
        const userCookie = Cookies.get('user')
        
        // if cookie is not present, set the user state value to null
        if (!userCookie) { 
            console.log('user is not authenticated')
            setUser('null')

        } else { 
            console.log('user is authenticated')
        }
        
    }
    

    useEffect(()=> { 
        checkAuthentication()
       if (user === 'null') { 
            console.log('should be navigating user')
            navigate("/login")
        }
    },[user])
    return(
        <div>Home page</div>
    )
}

export default Home