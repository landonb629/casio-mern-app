import React from "react";
import { useState, useEffect } from "react";
import FormRow from './Form-row'

const Login = () => { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isMember, setIsMember] = useState(false)

    const handleInput = (e) => { 
        e.preventDefault()
        console.log(e.target.name)
        console.log(e.target.value)
        setUsername(e.target.value)
    }

    const formSubmission = () => { 

    }

    const toggleMember = () => { 
        setIsMember(true)
    }
    return(
        <main>
            <div>Login to your casino portal</div>
            <form onSubmit={formSubmission}>
                <div>
                <label htmlFor="test">test input</label>
                <input type="text" value={username} onChange={() => handleInput}></input>
                </div>
                <FormRow 
                  label="username"
                  name="username"
                  onChange={handleInput}
                  type="text"
                />
                <FormRow 
                  label="password"
                  name="password"
                  onChange={handleInput}
                  type="password"
                />
            </form>
            <div>
                <button type="submit">Login</button>
            </div>
        </main>
    )
}

export default Login