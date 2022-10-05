import {URL_STORE_GET_CATEGORIES} from '../settings'

export default function GetProducts(){
   return (
    fetch(URL_STORE_GET_CATEGORIES)
   .then(response => response.json())
   .then((data) => {return data}))
}
