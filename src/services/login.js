import {URL_LOGIN} from '../settings'
const cok = document.cookie
const token = cok.substring(10,cok.length)
export default function login(email, password){
    return(
        fetch(URL_LOGIN, {
        method: "POST",
        headers: {
          "X-CSRFToken": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email , 
          password:password,
        }),
      }).then(response => {
        if(response.status !== 200){
          throw new Error('Nombre de usuario o contraseña incorrecta')
        }
        return response.json();
      })
    )
}