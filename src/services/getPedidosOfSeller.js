import {URL_GET_PEDIDOS_OF_SELLER} from '../settings'

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function getPedidosOfSeller(){
    return fetch(URL_GET_PEDIDOS_OF_SELLER, {
        method: 'GET',
        headers: {
            Authorization: `Token ${key}`,
            "X-CSRFToken": token,
        },
    }).then(res => {return res.json()})
}