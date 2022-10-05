import {URL_GET_VIDEO} from '../settings'
export default function getVideo(){
    return(
        fetch(URL_GET_VIDEO)
         .then(response => response.json())
         .then((data) => {return data})
    )
}