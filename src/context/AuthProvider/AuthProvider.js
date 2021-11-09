import React, { createContext } from 'react';
import useFirbase from '../../hooks/useFirebase';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const allContext = useFirbase()
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;