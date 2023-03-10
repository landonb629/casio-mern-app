import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => { 
    const initialUser = {
        balance: 0,
        username: ''
    }

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [userProperties, setUserProperties] = useState(initialUser)
    const [loading, setLoading] = useState(true)
    // function that checks if the username cookie is present in the browser

    const checkAuthentication = async () => { 
        console.log('running check user auth')
        const userCookie = Cookies.get('user')
        // if cookie is not present, set the user state value to null
        if (!userCookie) { 
            setUser('null')
        }
    }
 
const getUserData = async () => { 
    try { 
        console.log('running get user data')
        const userData = await fetch('http://localhost:3007/api/v1/transaction', {
                method: "GET",
                credentials: 'include'
        })
              const response = await userData.json()
              const {accountBalance, username} = response.user
              setUserProperties({balance: accountBalance, username: username})
              setLoading(false)
            } catch(error) { 
        }
    }
const deposit = (e) => { 
    e.preventDefault()
    setUserProperties({...userProperties, balance: 10})
}


    useEffect(()=> { 
       checkAuthentication()
       if (user === 'null') { 
            console.log('should be navigating user')
            navigate("/login")
       } 
       getUserData()
    },[user])

    if (loading) { 
        return <section><h2>loading...</h2></section>
    }
    return(
        <main> 
            <div>
                <h2>Welcome {userProperties.username} </h2>
            </div>
            <section>
                <div>
                  <h4>balance: {userProperties.balance}</h4>
                </div>
                <button onClick={deposit}>Deposit</button>
            </section>
        </main>
    )
}

export default Home