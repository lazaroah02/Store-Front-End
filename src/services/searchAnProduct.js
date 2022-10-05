import {URL_SEARCH_PRODUCT} from '../settings'

export default function searchProduct(productName = ''){
    return(
        fetch(`${URL_SEARCH_PRODUCT}${productName}`)
        .then(response => {
            if(response.status === 200){
                return response.json()
            }
            else{
                throw new Error('Not Found')
            }
        })
    )
}