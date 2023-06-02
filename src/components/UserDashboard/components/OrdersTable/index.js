import React, {useEffect, useState} from 'react'
import getPedidosOfSeller from "../../../../services/getPedidosOfSeller"
import setPedidosFinalizados from '../../../../services/setPedidosFinalizados'
import ProgresGif from '../../../ProgresGif'
import './index.css'
import "../user-dashboard-panel-styles.css"

export default function OrdersTable(){
    const [orders, setOrders] = useState([])
    const [pedidosHechos, setPedidosHechos] = useState([])
    const [loading, setLoading] = useState(true)
    const [pedirOrders, setPedirOrders] = useState(0)

    useEffect(() => {
        setLoading(true)
       getPedidosOfSeller()
       .then(data => {
        setOrders(data)
        setLoading(false)
    })
    },[pedirOrders])

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      }

    function handleSendPedidosHechos(){
        if(pedidosHechos.length > 0){
            setLoading(true)
            setPedidosFinalizados(pedidosHechos)
            .then(res => {
                if(res.status === 200){
                    alert("Operacion Exitosa")
                    setLoading(false)                    
                    setPedidosHechos([])
                    setPedirOrders(pedirOrders + 1)
                }
                else{
                    alert("Error al realizar la operacion")
                }
            })
        }
        else{
            alert("Debes seleccionar algun pedido")
        }
    }

    function handleAddPedidoHecho(e){
        let value = e.target.value
        if(pedidosHechos.indexOf(e.target.value) === -1){
            let arr2 = [...pedidosHechos]
            arr2.push(value)
            setPedidosHechos(arr2)
        }
        else{
            let arr3 = [...pedidosHechos]
            arr3.splice(pedidosHechos.indexOf(value), 1)
            setPedidosHechos(arr3)
        }
    }
    return(
        <div className = "user-dashboard-panel">
            <div className = 'list-of-orders-container'>
                {loading?<ProgresGif/>:null}
                <ul className = "orders-list">
                        <li className = "orders-list-header">
                            <div className = "check-button-space-header"></div>
                            <div>Producto</div>
                            <div>Unidades</div>
                            <div>Precio</div>
                            <div>Total</div>
                            <div>Comprador</div>
                            <div>Fecha</div>
                        </li>
                    {orders.lenght === 0 
                    ?
                    <li>
                        "No tienes ordenes"
                    </li>
                    :
                    orders.map(order => 
                    <li key = {order.id}>
                        <div className = "check-button-space"><input type = "checkbox" onChange={(e) => handleAddPedidoHecho(e)} value = {order.id}></input></div>
                        <div>{order.nombre_producto}</div>
                        <div>{order.unidades}</div>
                        <div>${order.precio_producto}</div>
                        <div>${order.total}</div>
                        <div>{order.user}</div>
                        <div>{formatDate(order.created_at)}</div>
                    </li>)
                    }
                </ul>
            </div>
                <div className = 'button-marcar-como-hecho-container'>
                    <button className = "btn" onClick = {() => handleSendPedidosHechos()}>Marcar como hecho</button>
                </div>
        </div>
    )
}