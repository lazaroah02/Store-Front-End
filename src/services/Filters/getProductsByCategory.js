import {URL_GET_PRODUCTS_BY_CATEGORY} from '../../settings'

export default function getProductsByCategory(categoria_id, desde = 0, hasta = 24){
      return(
         fetch(`${URL_GET_PRODUCTS_BY_CATEGORY}${categoria_id}/desde=${desde}hasta=${hasta}/`)
         .then(response => response.json())
         .then((data) => {return data})
      )
}
