import {URL_RATE_PRODUCT} from '../settings'
const cok = document.cookie
const token = cok.substring(10,cok.length)
export function rateProduct({productId, score, comment, userToken, userId}){
    return(
        fetch(URL_RATE_PRODUCT,{
            method: 'POST',
            headers: {
                Authorization: `Token ${userToken}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                score:score,
                product:productId,
                comment:comment,
                user:userId
            })
        })
        .then(response => {
            return response
        })
    )
}