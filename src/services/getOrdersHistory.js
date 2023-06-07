import {URL_GET_ORDERS_HISTORY} from '../settings'
export function getOrdersHistory({token}){
    return fetch(URL_GET_ORDERS_HISTORY,{
        method:"GET",
        headers: {
            Authorization: `Token ${token}`,
        },
    })
    .then(res => res.json())
    .then(data => {return data})
}