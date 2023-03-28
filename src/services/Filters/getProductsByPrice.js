import {URL_GET_PRODUCTS_BY_PRICE} from '../../settings'

export default function getProductsByPrice(price = [0, 0], desde = 0, hasta = 25){
      return(
         fetch(`${URL_GET_PRODUCTS_BY_PRICE}desde=${price[0]}hasta=${price[1]}/desde=${desde}hasta=${hasta}`)
         .then(response => response.json())
         .then((data) => {return data})
      )
}
