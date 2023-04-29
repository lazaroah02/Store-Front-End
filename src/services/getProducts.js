import {URL_GET_PRODUCTS} from '../settings'

export default function getAllProducts(filters = ""){
      return(
         fetch(`${URL_GET_PRODUCTS}?${filters}`)
         .then(response => response.json())
         .then((data) => {return data})
      )
}
