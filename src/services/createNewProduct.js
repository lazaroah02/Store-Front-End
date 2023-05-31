import {URL_PRODUCTS_OF_SELLER} from "../settings"

export default function createNewCategory({info, token, username}){
    let formData = new FormData()
    formData.append('product_name', info.name)
    formData.append('user', username)
    formData.append('product_description', info.description)
    formData.append('about', info.about)
    formData.append('precio', info.precio)
    formData.append('descuento', info.descuento)
    formData.append('in_stock', info.in_stock)
    formData.append('categoria', info.categoria_id)
    formData.append('product_img1', info.img1)
    formData.append('product_img2', info.img2)
    formData.append('product_img3', info.img3)
       
    return(
        fetch(URL_PRODUCTS_OF_SELLER,{
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
            },
            body:formData
        })
        .then(response => {
            return response
        })
    )
}