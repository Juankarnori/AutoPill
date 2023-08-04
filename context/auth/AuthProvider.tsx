import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interface';
import { autopillApi } from '@/api';
import { useRouter } from 'next/router';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
      checkToken();
    }, [])
    
    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const {data} = await autopillApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const {data} = await autopillApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;

        } catch (error) {
            return false;
        }

    }

    const registerUser = async( usuario: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const {data} = await autopillApi.post('/user/register', { usuario, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }
            
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se pudo crear el usuario'
            }
        }

    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('receta');
        router.reload();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
};