import {URL_STORE} from '../settings'
import {URL_STORE_CATEGORY} from '../settings'

export default function GetProducts(categoria_id = 0){
   if(categoria_id === null || categoria_id === 0){
      return(
         fetch(`${URL_STORE}`)
         .then(response => response.json())
         .then((data) => {return data})
      )
   }
   else{
      return(
         fetch(`${URL_STORE_CATEGORY}${categoria_id}/`)
         .then(response => response.json())
         .then((data) => {return data})
      )
   }
}

