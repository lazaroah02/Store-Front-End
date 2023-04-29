import {URL_RECOMMENDED_PRODUCTS} from "../settings"

export default function getRecommendedProducts(){
  return fetch(URL_RECOMMENDED_PRODUCTS)
  .then(res => res.json())
  .then(data => {return data})
}
