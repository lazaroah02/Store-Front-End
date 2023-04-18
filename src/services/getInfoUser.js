import {BASE_URL} from "../settings"

export default function getInfoUser(key){
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
