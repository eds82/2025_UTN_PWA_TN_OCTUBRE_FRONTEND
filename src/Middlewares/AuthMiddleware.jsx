import React from 'react'
import LOCALSTORAGE_KEYS from '../constants/localstorage'
import { Navigate, Outlet } from 'react-router'

const AuthMiddleware = () => {
    //Obtenemos un elemento del localStorage
    const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    if(auth_token){     //Si esto es true
        return <Outlet/>   //Devolvera al '/home'
    }
    else{
        return <Navigate to={'/login'}/>     //Si no hay token, voldes al login
    }
}

export default AuthMiddleware