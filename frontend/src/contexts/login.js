import { createContext, useContext, useState } from "react";


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({children}) => { 
    const initialUser = { 
        balance: '',
        isAuthenticated: false,
        username: '',
        userId: ''
    }
    const [user, setUser] = useState(initialUser)
    return <GlobalContext.Provider value={{user, setUser}}>
        {children}
    </GlobalContext.Provider>
}

export default AppContext

