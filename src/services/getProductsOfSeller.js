import {URL_PRODUCTS_OF_SELLER} from '../settings'

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function GetProducts(desde = 0, hasta = 25){
    return(
       fetch(`${URL_PRODUCTS_OF_SELLER}desde=${desde}hasta=${hasta}/`,{
        method: 'GET',
        headers: {
            Authorization: `Token ${key}`,
            "X-CSRFToken": token,
            "Content-Type": "application/json",
        },
       })
       .then(response => response.json())
       .then((data) => {return data})
    )
}
