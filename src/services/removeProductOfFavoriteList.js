import {URL_REMOVE_PRODUCT_OF_FAVORITE_LIST} from '../settings'
export function removeProductOfFavoriteList({token, productId}){
    return fetch(`${URL_REMOVE_PRODUCT_OF_FAVORITE_LIST}/${productId}/`,{
        method: "POST",
        headers:{
            Authorization:`Token ${token}`,
            Accept: "application/json",
        }
    })
    .then(res => {return res})
}