import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/login";

const Login = () => {

    const credentials = {
        username: '',
        password: ''
    }
    const {user, setUser} = useGlobalContext()
    const navigate = useNavigate()
    const [creds, setCreds] = useState(credentials)
    const [isMember, setIsMember] = useState(false)
    //const [authenticated, setIsAuthenticated] = useState(Cookies.get('user') || false)

    const handleChange = (e) => { 
       setCreds(creds => ({...creds, [e.target.name]: e.target.value}))
    }

    const submitAuthentication = async (e) => { 
        e.preventDefault()
        if (isMember) { 
            try { 
                const login = await loginUser()
                const {userId, username} = login.payload 
                userId ? setUser({...user, isAuthenticated: true}) : setUser({...user, isAuthenticated: false})
            } catch (error) { 
                alert(error)
            }
        } else { 
            try { 
                const register = await registerUser()
                const {userId, username} = register.payload
                userId ? setUser({...user, isAuthenticated: true}) : setUser({...user, isAuthenticated: false})
            } catch (error) { 
                console.log(error)
                alert(error)
            }
        }
    }

    const loginUser = async () => { 
        try { 
            const request = await fetch('http://localhost:3007/api/v1/auth/login', { 
                    method: "POST",
                    credentials: 'include',
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username: creds.username, password: creds.password})
                })
                const response = await request.json()
                return response
        } catch (error) { 
            alert(error)
        }
    }

    const registerUser = async () => { 
        try { 
            const request = await fetch('http://localhost:3007/api/v1/auth/register', { 
                method: 'POST',
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: creds.username, password: creds.password})
            })
            const response = await request.json()
            return response
        } catch (error) { 

        }
    }
    const checkAuthentication = async () => { 
        const userCookie = Cookies.get('user')
        
        if (!userCookie) { 
           setUser({...user, isAuthenticated: false})
        } else { 
            setUser({...user, isAuthenticated: true})
        }
    }

    useEffect(()=> {
        checkAuthentication()
        if (user.isAuthenticated) { 
            navigate("/")
        } else { 
            console.log('user is not authenticated');
            console.log(user);
        }
    }, [user.isAuthenticated])

    return(
        <main style={{padding: 50}}>
             <h2>{ isMember ?  "Login" : "Register"  }</h2>
            <form onSubmit={submitAuthentication}>
                <label >Username: </label>
                <input type="text" name="username" onChange={handleChange}></input>
                <br></br>
                <br></br>
                <label>Password: </label>
                <input type="text" name="password" onChange={handleChange}></input>
                <br></br>
                <button type="submit">{!isMember ? "Register" : "Login" }</button>
            </form>
            <br></br>
            <div>
            <button style={{ outline: 0, color: "inherit" }} onClick={()=> {setIsMember(!isMember)}}>Already a member?</button>
            </div>
                
        </main>
    )
}

export default Login