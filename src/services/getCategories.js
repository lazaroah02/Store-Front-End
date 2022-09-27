const productsUrl = 'http://127.0.0.1:8000/store/categories/'

export default function GetProducts(){
   return (
    fetch(productsUrl)
   .then(response => response.json())
   .then((data) => {return data}))
}
