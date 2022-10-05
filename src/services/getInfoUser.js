import { URL_INFO_USER } from "../settings";
export default function getInfoUser( key ) {
  return fetch(URL_INFO_USER, {
    headers: {
      Authorization: `Token ${key}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
}
