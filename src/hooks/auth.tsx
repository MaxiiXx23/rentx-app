import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from "react";

import { api } from "../services/api";
import { database } from "../database";
import { User as UserModel } from "../database/Model/User";

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string
}


interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);

    async function signIn({ email, password }: SignInCredentials) {
        try {

            const response = await api.post('/sessions', {
                email,
                password
            })

            const { token, user } = response.data;

            // aqui eu seto em todas as requisões o token de autorização no header.
            api.defaults.headers.authorization = `Bearer ${token}`;

            await database.write( async () => {
                const usersCollection = database.get<UserModel>('users');
                await usersCollection.create((newUser) => {
                    newUser.user_id = user.id,
                        newUser.name = user.name,
                        newUser.email = user.email,
                        newUser.driver_license = user.driver_license,
                        newUser.avatar = user.avatar,
                        newUser.token = token
                })
            })

            setData({ ...user, token });

        } catch (error) {

            throw new Error(error);

        }

    }

    useEffect(() => {
        async function loadData (){
            const usersCollection = database.get<UserModel>('users');
            const response = await usersCollection.query().fetch();

            if(response.length > 0){
                const usersData = response[0]._raw as unknown as User;
                api.defaults.headers.authorization = `Bearer ${usersData.token}`;
                setData(usersData);
            }
        }

        loadData();

    },[])

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };