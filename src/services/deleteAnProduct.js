import {URL_PRODUCTS_OF_SELLER} from "../settings"

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function deleteAnProduct(id){
    return(
        fetch(URL_PRODUCTS_OF_SELLER,{
            method: 'DELETE',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id})
        })
        .then(response => {
            return response
        })
    )
}