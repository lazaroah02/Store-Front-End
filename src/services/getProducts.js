import {URL_STORE} from '../settings'
import {URL_STORE_CATEGORY} from '../settings'

export default function GetProducts(categoria_id = 0, desde = 0, hasta = 25){
   if(categoria_id === null || categoria_id === 0){
      return(
         fetch(`${URL_STORE}desde=${desde}hasta=${hasta}/`)
         .then(response => response.json())
         .then((data) => {return data})
      )
   }
   else{
      return(
         fetch(`${URL_STORE_CATEGORY}${categoria_id}/desde=${desde}hasta=${hasta}`)
         .then(response => response.json())
         .then((data) => {return data})
      )
   }
}

