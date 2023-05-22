import {URL_PRODUCTS} from "../settings"

export default function getRecommendedProducts(){
  return fetch(`${URL_PRODUCTS}?ordering=-puntuacion`)
  .then(res => res.json())
  .then(data => {return data})
}
