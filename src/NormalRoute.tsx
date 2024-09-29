import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getLocalStorageItem } from './utils/localStorageUtil';
import { decryptToken } from './utils/cryptoUtils';

interface NormalRouteProps {
    children: ReactNode;
}

const NormalRoute: React.FC<NormalRouteProps> = ({ children }) => {
    const isloggedIn = getLocalStorageItem('isloggedIn');

    try {
        if (isloggedIn) {
            const decryptLoginState = decryptToken(isloggedIn as string);

            if (decryptLoginState === 'true') {
                const location = useLocation();
                return <Navigate to="/dashboard" state={{ from: location }} replace />;
            }
        }
    } catch (error) {
        console.error('Error decrypting token:', error);
    }

    return <>{children}</>;
};

export default NormalRoute;
