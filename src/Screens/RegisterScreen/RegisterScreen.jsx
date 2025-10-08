import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'

//Esto es un objeto que define las claves de los campos del formulario (name, email, password).
//Sirve para no estar repitiendo strings sueltos en el código (evita errores de tipeo).
const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password'
}
//Es un objeto que representa el estado inicial de todos los inputs (vacíos).
const initial_form_state = {
  [FORM_FIELDS.NAME]: '',
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
}


const RegisterScreen = () => {

  const {
    sendRequest,
    loading,
    response,
    error
  } = useFetch()



  const onRegister = (form_state) => {
      sendRequest( () => register(
          form_state[FORM_FIELDS.NAME],
          form_state[FORM_FIELDS.EMAIL],
          form_state[FORM_FIELDS.PASSWORD]
      ))
  }

  /* const onRegister = (form_state) => {
    sendRequest(() => {
      register(
        form_state[FORM_FIELDS.NAME],
        form_state[FORM_FIELDS.EMAIL],
        form_state[FORM_FIELDS.PASSWORD]
      )
    })
  } */
  //Llamamos al hook creado en useForm, desestructurando form_state y llamandolo register_form_state, tambien se llamara a HandleSubmit y handleInputChange y todo eso va a venir de:  useForm
  const { form_state: register_form_state, handleSubmit, handleInputChange
  } = useForm(       //useForm va a devolver esos tres valores
    {
      initial_form_state,
      onSubmit: onRegister
    }
  )

  console.log(loading)
  return (
    <div>
      <h1>Registrate</h1>
      <form onSubmit={handleSubmit}>
        {/*
            name, email, password (No hace falta validacion)
            Armar un formulario con los campos solicitados
            Crear una funcion handleSubmit que muestre por consola los valores de cada campo del formulario (Debe guardarse como un objeto en una variable o estado)

            */}
        <div>
          <label htmlFor={FORM_FIELDS.NAME}>Nombre:</label>
          <input
            name={FORM_FIELDS.NAME}
            id={FORM_FIELDS.NAME}
            type='text'
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
          <input
            name={FORM_FIELDS.EMAIL}
            id={FORM_FIELDS.EMAIL}
            type='email'
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña:</label>
          <input
            name={FORM_FIELDS.PASSWORD}
            id={FORM_FIELDS.PASSWORD}
            type='password'
            onChange={handleInputChange}
          />
        </div>
        {
          !response
            ? <button type='submit' disabled={loading}>Registrarse</button>
            : <>
              <button type='submit' disabled={true}>Registrado</button>
              <span style={{ color: 'green' }}>{response.message}</span>
            </>
        }
        {
          error && <span style={{ color: 'red' }}>{error.message}</span>   //Si el error es verdadero entonces mostrame un span con el estilo de color de letra en rojo que diga el mensaje de error
        }

      </form>
    </div>
  )
}

export default RegisterScreen