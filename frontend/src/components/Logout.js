import Cookies from 'js-cookie'
import { useGlobalContext } from '../contexts/appcontext'
const Logout = () => { 
    const {userInfo, setUserInfo } = useGlobalContext()
    const initialState = { 
        username: '',
        balance: 0,
        isAuthenticated: false,
        userId: ''
    }
    const logoutCleanup = async () => { 
        console.log('cleaning up cookies and localstorage')
        localStorage.removeItem('balance')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        Cookies.remove('user', { path: ''})
        setUserInfo(initialState)
    }
    return(
       <button onClick={logoutCleanup}>logout</button>
    )
}

export default Logout