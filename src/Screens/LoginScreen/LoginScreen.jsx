//TODO: Implementar el login

import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'
import { login } from '../../services/authService'
import { useNavigate } from 'react-router'
import LOCALSTORAGE_KEYS from '../../constants/localstorage'

// Definimos las claves del formulario
const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

// Estado inicial del formulario (vacío)
const initial_form_state = {
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
}

const LoginScreen = () => {

  //se utiliza esto para poder redireccionar
  const navigate = useNavigate()

  const {
    sendRequest,
    loading,
    response,
    error
  } = useFetch()
  
// Función que se ejecuta al hacer submit
  const onLogin = (form_state) => {
    sendRequest(() =>
      login(
        form_state[FORM_FIELDS.EMAIL],
        form_state[FORM_FIELDS.PASSWORD]
      )
    )
  }

  useEffect(
    () =>{
      console.log(response)
      if(response && response.ok){
        //Guardamos el tiken emitido por el backend, para despues usarlos como credencial
        localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
        navigate('/home')    //Redirecciona a home
      }
    },
    [response]
  )

// useForm devuelve los valores y handlers
  const {
    form_state: login_form_state,
    handleSubmit,
    handleInputChange
  } = useForm({
    initial_form_state,
    onSubmit: onLogin
  })

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={FORM_FIELDS.EMAIL}>Email</label>
          <input
            name={FORM_FIELDS.EMAIL}
            id={FORM_FIELDS.EMAIL}
            type="email"
            onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña</label>
          <input
            name={FORM_FIELDS.PASSWORD}
            id={FORM_FIELDS.PASSWORD}
            type="password"
            onChange={handleInputChange} 
          />
        </div>

        
        {/* <div>
          <button type="submit" disabled={loading}>
            Iniciar sesión
          </button>
        </div>

        
        {response && (
          <span style={{ color: 'green' }}>
            {response.message}
          </span>
        )}
        {error && (
          <span style={{ color: 'red' }}>
            {error.message}
          </span>
        )} */}

        {
            !response
            ? <button type='submit' disabled={loading}>Iniciar sesión</button>
            : <>
                <button type='submit' disabled={true}>Sesion iniciada</button>
                <span style={{color: 'green'}}>{response.message}</span>
            </>   
        }
        {
           error && <span style={{color: 'red'}}>{error.message}</span>   //Si el error es verdadero entonces mostrame un span con el estilo de color de letra en rojo que diga el mensaje de error
        }
        

        
      </form>
    </div>
  )
}

export default LoginScreen