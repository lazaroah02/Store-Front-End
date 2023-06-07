import { URL_GET_ID_OF_PRODUCTS_IN_FAVORITE_LIST } from "../settings"

export function getIdOfProductsInFavoriteList({token}){
    return fetch(URL_GET_ID_OF_PRODUCTS_IN_FAVORITE_LIST , {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then(res => res.json())
    .then(data => {return data})
}