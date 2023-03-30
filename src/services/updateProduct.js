import {URL_PRODUCTS_OF_SELLER} from "../settings"

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function createNewCategory(info){
    let formData = new FormData()
    formData.append('product_id', info.id)
    formData.append('product_name', info.name)
    formData.append('product_description', info.description)
    formData.append('about', info.about)
    formData.append('precio', info.precio)
    formData.append('categoria', info.categoria_id)
    if(info.img1 !== undefined){
        formData.append('product_img1', info.img1)
    }
    if(info.img2 !== undefined){
        formData.append('product_img2', info.img2)
    }
    if(info.img3 !== undefined){
        formData.append('product_img3', info.img3)
    }    
    return(
        fetch(URL_PRODUCTS_OF_SELLER,{
            method: 'PUT',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
            },
            body:formData
        })
        .then(response => {
            return response
        })
    )
}