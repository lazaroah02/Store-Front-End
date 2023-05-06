import {URL_CHECK_USER_CAN_RATE} from '../settings'
const cok = document.cookie
const token = cok.substring(10,cok.length)
export function checkIfUserCanRate({productId, userToken}){
    return fetch(`${URL_CHECK_USER_CAN_RATE}${productId}`, {
        method: 'GET',
            headers: {
                Authorization: `Token ${userToken}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
    })
    .then(res => {return res})
}