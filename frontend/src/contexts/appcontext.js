import React from 'react'
import { useContext, createContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const initialState = { 
    username: '',
    balance: 0,
    isAuthenticated: false,
    userId: ''
}

const AppContext = ({children}) => { 
    const [userInfo, setUserInfo] = useState(initialState)
    const [isLoading, setIsLoading] = useState(true)


    const checkAuth = async () => { 
        const getCookie = Cookies.get('user')
        console.log(getCookie);
        const userId = localStorage.getItem('userId')
        const username = localStorage.getItem('username')
        const balance = localStorage.getItem('balance')
        if (getCookie) { 
            console.log('get cookie is true');
            setUserInfo({...userInfo, isAuthenticated: true, userId: userId, username: username, balance: balance})
        } else { 
            setUserInfo({...userInfo, isAuthenticated: false})
        }

    }

    useEffect(()=> { 
        checkAuth()
    },[])

    return(
        <GlobalContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext


