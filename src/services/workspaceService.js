import ENVIRONMENT from "../config/envionment";
import { getAuthorizationToken } from "../constants/http";
import LOCALSTORAGE_KEYS from "../constants/localstorage";

async function getWorkspaceList (){
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + /* localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN) */getAuthorizationToken()
            }
        }
    )

    const response_data = await response_http.json()
    return response_data
}
/*
createWorkspace(name, url_img = '')
Consumir la api para crear un workspace
*/

async function createWorkspace(name, url_img = ''){
    const body = {
        name: name,
        url_img: url_img,
    }

    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getAuthorizationToken()}`
            },
            body: JSON.stringify(body),
        }
    )
    const response_data = await response_http.json();
    if(!response_data.ok){
        throw new Error(response_data.message)
    }
    return response_data;
}

export { getWorkspaceList, createWorkspace }
