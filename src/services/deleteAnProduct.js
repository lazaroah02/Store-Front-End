import {URL_PRODUCTS_OF_SELLER} from "../settings"

export function deleteProduct({products, token}){
    return(
        fetch(URL_PRODUCTS_OF_SELLER,{
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({products_to_delete:products})
        })
        .then(response => {
            return response
        })
    )
}