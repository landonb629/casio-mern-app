import React from 'react'
import { useContext, createContext, useEffect, useReducer, useState} from 'react'
import Cookies from 'js-cookie'
import setLocalInfo from '../helpers/setLocalInfo'

const GlobalContext = React.createContext()

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
        const userId = localStorage.getItem('userId')
        const username = localStorage.getItem('username')
        if (getCookie) { 
            setUserInfo({...userInfo, isAuthenticated: true, userId: userId, username: username})
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


