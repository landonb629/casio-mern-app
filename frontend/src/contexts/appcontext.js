import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)


const AppContext = ({children}) => { 
    const navigate = useNavigate()
    const initialUser = { 
        balance: '',
        isAuthenticated: false,
        username: '',
        userId: ''
    }
    const [user, setUser] = useState(initialUser)

    const loadUser = async () => { 
        console.log('firing the load user');
        const cookie = Cookies.get('user')
        if (!cookie) { 
            console.log('didnt find a user');
            navigate('/login')
        } else { 
            setUser({...user, isAuthenticated: true})
        }
    }

    useEffect(()=> { 
      loadUser()
    },[])
    
    return <GlobalContext.Provider value={{user, setUser}}>
        {children}
    </GlobalContext.Provider>
}

export default AppContext

