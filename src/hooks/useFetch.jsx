import { useState } from "react"

//Gestion INTERNA de los fetch de mi aplicacion, para eso va a crear una serie de estados: loading, response y error
const useFetch = () =>{
    const [loading, setloading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

//Creo una funcion que va a recibir una funcion de consulta(requestCallback)
    async function sendRequest (requestCallback) {
        try {
            //Marcamos que estamos cargando
            setloading(true)
            setError(null)   //Para limpiar cualquier error posible de alguna consulta anterior

            //Ejecutamos la consulta HTTP
            const response = await requestCallback()    //Invoca a la requestCallback

            //Seteamos la respuesta como estado
            setResponse(response)
        }
        catch (error) {
            setError(error)
        }
        //Finalmente pase lo que pase deja de cargar
        finally{
            setloading(false)
        }
    }
 //Retornamos los estados
    return {
        loading,
        response,
        error,
        sendRequest
    }

}

export default useFetch