import React, {useEffect, useState} from 'react'
import getPedidosOfSeller from "../../../../services/getPedidosOfSeller"
import './index.css'

export default function InfoUser(){
    const [orders, setOrders] = useState([])
    const [pedidosHechos, setPedidosHechos] = useState([])
    useEffect(() => {
       getPedidosOfSeller()
       .then(data => {
        setOrders(data)})
    },[])

    function handleSendPedidosHechos(){
        console.log(pedidosHechos)
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
    console.log(pedidosHechos)
    return(
        <div>
            <div className = 'list-of-orders'>
                <table className = "table tabla-orders">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Producto</th>
                            <th scope="col">Unidades</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Total</th>
                            <th scope="col">Usuario</th>
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
                        <td>{order.user}</td>
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