import {URL_STORE_GET_SPECIAL_PROMOTIONS} from '../settings.js'
export function getSpecialPromotions(){
    return fetch(URL_STORE_GET_SPECIAL_PROMOTIONS)
    .then(res => res.json())
    .then(data => {return data})
}