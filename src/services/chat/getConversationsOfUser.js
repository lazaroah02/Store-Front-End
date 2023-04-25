import { URL_GET_CONVERSATIONS_OF_USER } from "../../settings";

export function getConversationsOfUser(token){
    return fetch(URL_GET_CONVERSATIONS_OF_USER, {
        headers: { 
            'Authorization': `token ${token}`,
            'Accept': 'application/json',
        }
    }).then(res => res.json())
    .then(data => {return data})
}