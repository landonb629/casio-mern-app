import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../contexts/appcontext'
import  sendPost from '../helpers/sendPost'
import setLocalInfo from '../helpers/setLocalInfo'
import styled from 'styled-components'

const Wrapper = styled.div` 
    .grid-container { 
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        width: 100vw;
        height: 100vh
    }
    .grid-child { 
        grid-column: 2 / 3;
        grid-row: 2/ 3 ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .username { 
        padding: 10px 
    }
    .password { 
        padding: 10px;
    }
    .login-btn { 
        text-align: center;
        height: 20px;
    }
    .btn { 
        width: 50%;
    }

`




const LoginForm = () => { 
    const {userInfo, setUserInfo} = useGlobalContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)

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
        try{
        e.preventDefault()
        const registerUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:3032' : '/api/v1/auth/register' 
        const loginUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:3032' : '/api/v1/auth/login' 

        if (isRegister) { 
            const register = await sendPost(registerUrl, credentials )
            const registerResponse = await register.json()
            const {userId, username, balance} = registerResponse.payload
            if (balance === undefined) { 
                localStorage.setItem('balance', 0)
                localStorage.setItem('username', username)
                localStorage.setItem('userId', userId)
                setUserInfo({...userInfo, isAuthenticated: true, username: username, userId: userId, balance: 0})
            } else { 
                localStorage.setItem('balance', balance)
                localStorage.setItem('username', username)
                localStorage.setItem('userId', userId)
                setUserInfo({...userInfo, isAuthenticated: true, username: username, userId: userId, balance: balance})
            }
            navigate("/")
        } else { 
            console.log('running the login section');
            const login = await sendPost(loginUrl, credentials )
            const loginResponse = await login.json()
            const {userId, username, balance} = loginResponse.payload
            console.log({userId: userId, balance: balance, username: username});
            if (balance === undefined) { 
                localStorage.setItem('balance', 0)
                localStorage.setItem('username', username)
                localStorage.setItem('userId', userId)
                setUserInfo({...userInfo, isAuthenticated: true, username: username, userId: userId, balance: 0})
            } else { 
                localStorage.setItem('balance', balance)
                localStorage.setItem('username', username)
                localStorage.setItem('userId', userId)
                setUserInfo({...userInfo, isAuthenticated: true, username: username, userId: userId, balance: balance})
            }
            navigate("/")
        }
    } catch(error) { 
        console.log(error)
    }
       
    }

    const registerToggle = () => { 
        setIsRegister(!isRegister)
        console.log(isRegister);
    }

    return(
        <Wrapper>
        <section className='grid-container'>
            <div className='grid-child'>
            <h2>Demo Casino App</h2>
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
                <div className='login-btn'>
                <button type="submit" className='btn'>{ isRegister ? 'Register' : 'Login'}</button>
                </div>
            </form>
            <div style={{ marginTop: 10 }}>
                <button onClick={()=>registerToggle()} style={{ border: 'none', outline: 'none', background: 'none', textDecoration: 'underline'}}>Already a member?</button>
            </div>
            </div>
        </section>
        </Wrapper>
    )
}

export default LoginForm