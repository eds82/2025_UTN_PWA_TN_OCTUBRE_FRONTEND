import LOCALSTORAGE_KEYS from "./localstorage"

export const HTTP_METHODS = {  //Se pone este diccionario para despues llamarlo mas abajo, poniendo primero HTTP_METHODS. y el nombre de la propiedad que se quiere
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export const HEADERS = {
    CONTENT_TYPE: 'Content-type'       //Asi esta en postman
}

export const CONTENT_TYPE_VALUES = {
    JSON: 'application/json'           //Asi esta en postman
}

export function getAuthorizationToken (){
    const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    return auth_token
}