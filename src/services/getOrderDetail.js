import {URL_ORDER_DETAIL} from '../settings'

export function getOrderDetail({token, orderId}){
    return fetch(`${URL_ORDER_DETAIL}/${orderId}`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then(res => res.json())
    .then(data => {return data})
}