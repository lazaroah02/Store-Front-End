import {URL_PRODUCT_DETAIL} from "../settings"
export default function getProductDetail(id_product){
    return(
        fetch(`${URL_PRODUCT_DETAIL}?id=${id_product}`)
         .then(response => response.json())
         .then((data) => {return data})
    )
}