import {URL_SEARCH_PRODUCT} from '../settings'

export default function searchProduct(productName = '', desde = 0, hasta =24 ){
    return(
        fetch(`${URL_SEARCH_PRODUCT}${productName}/desde=${desde}hasta=${hasta}`)
        .then(response => response.json())
    )
}