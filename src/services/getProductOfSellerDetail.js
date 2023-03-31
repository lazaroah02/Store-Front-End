import {URL_PRODUCT_OF_SELLER_DETAIL} from "../settings"
const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)
export default function getProductDetail(id_product){
    return(
        fetch(`${URL_PRODUCT_OF_SELLER_DETAIL}${id_product}/`,{
            headers:{
            Authorization: `Token ${key}`,
            "X-CSRFToken": token,
            }
        })
         .then(response => response.json())
         .then((data) => {return data})
    )
}