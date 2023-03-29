import {URL_SET_PEDIDOS_FINALIZADOS} from '../settings.js'

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function setPedidosFinalizados(lista_pedidos_finalizados = []){
    if(lista_pedidos_finalizados.length > 0){
        return fetch(URL_SET_PEDIDOS_FINALIZADOS,{
            method: 'POST',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
                'Content-Type': 'application/json'},
            body:JSON.stringify({
                lista_pedido:lista_pedidos_finalizados})   
        })
        .then(res => {return res})
    }
}