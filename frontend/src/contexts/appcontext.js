import React from 'react'
import { useContext, createContext, useEffect, useReducer, useState} from 'react'
import { Navigate } from 'react-router'

const GlobalContext = React.createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const initialState = { 
    username: '',
    balance: 100,
    isAuthenticated: false
}

const AppContext = ({children}) => { 
    const [userInfo, setUserInfo] = useState(initialState)

    return(
        <GlobalContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext


