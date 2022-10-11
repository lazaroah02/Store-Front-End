import { URL_INFO_USER } from "../settings";
import {BASE_URL} from "../settings"

export default function getInfoUser( key ) {
  return (fetch(URL_INFO_USER, {
    headers: {
      Authorization: `Token ${key}`,
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json()
    }
  })
  )
}

export function getUserProfileInfo(key){
  return (fetch(`${BASE_URL}/user-profile/`,{
    headers: {
      Authorization: `Token ${key}`,
    },
  })
  .then(res => {
    return res.json()
  })
)
}
