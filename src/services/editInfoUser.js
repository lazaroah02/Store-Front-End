import {BASE_URL} from '../settings.js'

const cok = document.cookie
const token = cok.substring(10,cok.length)
const key = localStorage.getItem('SessionToken')

export default function editInfoUser(method, data){
    return (
        fetch(`${BASE_URL}/user-profile/`,{
            method:method,
            headers: {
                "X-CSRFToken": token,
                "Content-Type": "application/json",
                Authorization: `Token ${key}`,
            },
            body: JSON.stringify({
                name: data.name,
                last_name: data.last_name,
                phone: data.phone,
                country: data.country,
                state: data.state,
                address: data.address,
                zip_code: data.zip_code,
            })
        })
    )
}