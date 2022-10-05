import {URL_REALIZAR_PEDIDO} from "../settings"
import {URL_LISTA_PEDIDO} from "../settings"

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function realizarPedido(listaPedido){
    return(
        fetch(URL_REALIZAR_PEDIDO,{
            method: 'POST',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if(response.status == 201){
                response.json()
                .then(data => sendListaPedido(data.id_pedido,listaPedido))
            }
            else{
                alert('Error al procesar el pedido')
            }
        })
    )
}

function sendListaPedido(id_pedido,listaPedido){
    return(
        fetch(URL_LISTA_PEDIDO,{
            method: 'POST',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_pedido:id_pedido,
                lista_pedido:listaPedido,
            })
        })
        .then(response => {
            if(response.status === 200){
                alert('Pedido realizado correctamente')
                window.location.reload()
            }
            else{
                alert('no se pudo realizar el prducto')
            }
        })
    )
}