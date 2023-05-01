import {URL_GET_PRODUCTS} from '../settings'

export default function getAllProducts(filters = ""){
      return (fetch(`${URL_GET_PRODUCTS}?${filters}`)
         .then(response => 
            {
            if(response.status === 200){
                  return response.json()
            }else{
                  throw new Error("Not Found")
            }
            }))
}
