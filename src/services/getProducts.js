const productsUrl = 'http://127.0.0.1:8000/store/'


export default function GetProducts(categoria_id = 0){
   if(categoria_id === null || categoria_id === 0){
      return(
         fetch(productsUrl)
         .then(response => response.json())
         .then((data) => {return data})
      )
   }
   else{
      return(
         fetch(`http://127.0.0.1:8000/store/category/${categoria_id}/`)
         .then(response => response.json())
         .then((data) => {return data})
      )
   }
}

