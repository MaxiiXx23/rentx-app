import React, { ReactNode } from 'react';

import { AuthProvider } from "./auth";

interface AuthProviderProps {
    children: ReactNode;
}

// aqui é possível centralizar os hooks e compartilhar através do AppProvider
// que é Context principal que provem dados para todas as telas/lugares da aplicação

function AppProvider ({ children } : AuthProviderProps){
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export { AppProvider };