import {URL_REGISTER} from '../settings'

const cok = document.cookie
const token = cok.substring(10,cok.length)
export default function register(email, password1, password2){
    return(
        fetch(URL_REGISTER, {
        method: "POST",
        headers: {
          "X-CSRFToken": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email , 
          password1:password1,
          password2: password2,
        }),
      }).then(response => {
        if(response.status === 201 || response.status === 200){
          return response.json()
        }
        else{
         throw new Error('The email already exist')
        }
      })
            
    )
}