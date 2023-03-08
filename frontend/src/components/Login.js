import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";


const Login = () => { 

    const credentials = {
        username: '',
        password: ''
    }
    const [creds, setCreds] = useState(credentials)
    const [isMember, setIsMember] = useState(false)

    const handleChange = (e) => { 
       setCreds(creds => ({...creds, [e.target.name]: e.target.value}))
    }

    const submitLogin = async (e) => { 
        e.preventDefault()
        if (isMember) { 
            try { 
                const login = await loginUser()
                console.log(login)
            } catch (error) { 
                console.log(error)
                alert(error)
            }
        } else { 
            try { 
                const register = await registerUser()
                console.log(register)
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

    const toggleMember = () => { 
      if (isMember) { 
        setIsMember(false)
      } else { 
          setIsMember(true)
      }
    }

    return(
        <main>
            <div>
                <h2>{ isMember ?  "Login" : "Register"  }</h2>
            </div>
            <form onSubmit={submitLogin}>
                <label >Username: </label>
                <input type="text" name="username" onChange={handleChange}></input>
                <br></br>
                <br></br>
                <label>Password: </label>
                <input type="text" name="password" onChange={handleChange}></input>
                <div>
                <br></br>
                <button type="submit">{!isMember ? "Register" : "Login" }</button>
            </div>
            </form>
            <br></br>
            <div>
                <button style={{ outline: 0, color: "inherit" }} onClick={toggleMember}>Already a member?</button>
            </div>
        </main>
    )
}

export default Login