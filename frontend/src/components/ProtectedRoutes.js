import { useGlobalContext } from "../contexts/appcontext"
import { Outlet, Navigate} from 'react-router-dom'
import { useEffect } from "react"

const ProtectedRoutes = () => { 
    const { userInfo } = useGlobalContext()

    return(
     userInfo.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes

