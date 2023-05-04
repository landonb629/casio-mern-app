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
        console.log(balance);
        if (getCookie) { 
            console.log('user is authenticated');
            console.log('getting the information about the user');
            setUserInfo({...userInfo, isAuthenticated: true, userId: userId, username: username, balance: balance})
        } else { 
            console.log('user not authenticated');
        }

    }

    const getBalance = async () => { 
        const userBalance = localStorage.getItem('balance')
        setUserInfo({...userInfo, balance: userBalance})
    }

    useEffect(()=> { 
        checkAuth()
    },[initialState])

    return(
        <GlobalContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext


