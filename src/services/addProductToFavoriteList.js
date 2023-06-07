import {URL_ADD_PRODUCT_TO_FAVORITE_LIST} from '../settings'
export function addProductToFavoriteList({token, productId}){
    return fetch(`${URL_ADD_PRODUCT_TO_FAVORITE_LIST}/${productId}/`,{
        method: "POST",
        headers:{
            Authorization:`Token ${token}`,
            Accept: "application/json",
        }
    })
    .then(res => {return res})
}