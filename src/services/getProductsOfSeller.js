import {URL_PRODUCTS_OF_SELLER} from '../settings'

export function getProductsOfSeller({token}){
    return(
       fetch(`${URL_PRODUCTS_OF_SELLER}`,{
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
       })
       .then(response => response.json())
       .then((data) => {return data})
    )
}
