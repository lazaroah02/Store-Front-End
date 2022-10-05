import React from 'react';
import CartRows from './CartRows'

export default function CartContent(){

    return(
        <table className = 'table'>
            <thead >
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Units</th>
                    <th scope="col">Sum</th>
                </tr>
            </thead>
            <tbody >
                 <CartRows />
            </tbody>
        </table>
    )
}