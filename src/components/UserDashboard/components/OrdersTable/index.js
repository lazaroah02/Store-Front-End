import React, {useEffect, useState} from 'react'
import getPedidosOfSeller from "../../../../services/getPedidosOfSeller"
import setPedidosFinalizados from '../../../../services/setPedidosFinalizados'
import ProgresGif from '../../../ProgresGif'
import {Link} from 'react-router-dom'
import ChatIcon from '../../../../assets/navBarIcons/chat-icon.svg'
import './index.css'

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
        <div className = "orders-table-container">
            <div className = 'list-of-orders'>
                {loading?<ProgresGif/>:null}
                <table className = "table tabla-orders">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Producto</th>
                            <th scope="col">Unidades</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Total</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.lenght === 0 
                    ?
                    <tr>
                        <td collSpan="5">"No tienes ordenes"</td>
                    </tr>
                    :
                    orders.map(order => 
                    <tr key = {order.id}>
                        <td><input type = "checkbox" onChange={(e) => handleAddPedidoHecho(e)} value = {order.id}></input></td>
                        <td>{order.nombre_producto}</td>
                        <td>{order.unidades}</td>
                        <td>${order.precio_producto}</td>
                        <td>${order.total}</td>
                        <td>{order.user}<Link to = {`/chat/${order.user}`}><img alt = "chat-icon" src = {ChatIcon}/></Link></td>
                        <td>{order.created_at.substr(0,10)}</td>
                    </tr>)
                    }
                    </tbody>
                </table>
            </div>
                <div className = 'button-marcar-como-hecho-container'>
                    <button className = "btn btn-primary" onClick = {() => handleSendPedidosHechos()}>Marcar como hecho</button>
                </div>
        </div>
    )
}