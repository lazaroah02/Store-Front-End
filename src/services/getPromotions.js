import {URL_STORE_GET_PROMOTIONS} from '../settings'

export function getPromotions(){
    return fetch(URL_STORE_GET_PROMOTIONS)
    .then(res => res.json())
    .then(data => {return data})
}