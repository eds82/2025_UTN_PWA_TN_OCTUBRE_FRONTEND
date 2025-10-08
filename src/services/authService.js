import ENVIRONMENT from "../config/envionment"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"

/* const HTTP_METHODS = {  //Se pone este diccionario para despues llamarlo mas abajo, poniendo primero HTTP_METHODS. y el nombre de la propiedad que se quiere
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
} */
export async function register(name, email, password) {      // Es asincronica por que la interaccion con el backend ya es asincronica
    const usuario = {
        email,
        username: name,
        password
    }
    //Queremos consumir nuestra API

    //fetch ordena al navegador hacer una consulta HTTP a una cierta direccion.
    //recibe 2 parametros: la URL de consulta y un objeto de configuracion de la consulta
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/register`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                //Como vamos a enviar JSON configuro que mi consulta envia contenido tipo JSON
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )

    //Transformamos a objeto de JS el body de la respuesta
    const response_data = await response_http.json()
    if( !response_data.ok ){    //Si response_data.ok es falso, 
        throw new Error(response_data.message)  //Entonces, agarras el message de error que te dio el servidor y se le pasa como nuevo error a quien llama esta funcion de register
    }
    return response_data
}



export async function login(email, password) {
    const usuario = {email, password}

    const response = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/login`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )

    const response_data = await response.json()

    if(!response.ok) {
        throw new Error(response_data.message)
    }

    return response_data
}