import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getLocalStorageItem } from './utils/localStorageUtil'
import { decryptToken } from './utils/cryptoUtils'

interface AdminProtectedRouteProps {
    children: ReactNode
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
    const isloggedIn = getLocalStorageItem("isloggedIn");
    const decryptLoginState = decryptToken(isloggedIn as string);
    const location = useLocation()

    if (decryptLoginState !== "true" || isloggedIn === null) {
        return <Navigate to='/' state={{ from: location }} replace />
    }
    return <>{children}</>
}

export default AdminProtectedRoute
