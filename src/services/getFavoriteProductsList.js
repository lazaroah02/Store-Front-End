import { URL_GET_FAVORITE_PRODUCTS_LIST } from "../settings"

export function getFavoriteProductsList({token}){
    return fetch(URL_GET_FAVORITE_PRODUCTS_LIST, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then(res => res.json())
    .then(data => {return data})
}