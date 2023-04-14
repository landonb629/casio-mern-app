import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../contexts/appcontext'
import  sendPost from '../helpers/sendPost'



const LoginForm = () => { 
    const {userInfo, setUserInfo} = useGlobalContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const credentials = { 
        username: username,
        password: password
    }

    const usernameInput = (e) => { 
        e.preventDefault()
        setUsername(e.target.value)
    }

    const passwordInput = (e) => { 
        e.preventDefault()
        setPassword(e.target.value)
    }

    const submitForm = async (e) => { 
        e.preventDefault()
        const url = "http://localhost:3032/api/v1/auth/register"
        const login = await sendPost(url, credentials )
        const loginResponse = await login.json()
        const {userId, username} = loginResponse.payload
        setUserInfo({...userInfo, isAuthenticated: true, username: username})
        navigate("/")
    }

    return(
        <section>
            <h2>Welcome to lbabay's virtual casino</h2>
            <form onSubmit={submitForm}>
                <div className='username'>
                    <label>
                        username: 
                        <input type="text" onChange={usernameInput} name="username" />
                    </label>
                </div>
                <div className="password">
                <label>
                        password: 
                        <input type="text" onChange={passwordInput} name="username" />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </section>
    )
}

export default LoginForm