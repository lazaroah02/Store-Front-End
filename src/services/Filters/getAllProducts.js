import {URL_GET_ALL_PRODUCTS} from '../../settings'

export default function getAllProducts(desde = 0, hasta = 25){
      return(
         fetch(`${URL_GET_ALL_PRODUCTS}desde=${desde}hasta=${hasta}/`)
         .then(response => response.json())
         .then((data) => {return data})
      )
}
