import {addProductToFavoriteList} from '../services/addProductToFavoriteList'
import {removeProductOfFavoriteList} from '../services/removeProductOfFavoriteList'

export function useHandleFavoriteProductsList({showFloatMessage, setFavorite, infoUser}){
    
    //add product to favorite list
    function addToFavoriteList(productId){
        if(infoUser.token === null){
            showFloatMessage({message:"Debes iniciar sesion para manejar tu lista de favoritos", type:"angry"})
        }else{
            addProductToFavoriteList({productId:productId, token:infoUser.token})
            .then(res => {
                if(res.status === 200){
                    showFloatMessage({title:"!", message:"Producto agregado a tu lista de favoritos", type:"success"})
                    setFavorite(true)
                }
                else if(res.status === 226){
                    showFloatMessage({title:"!", message:"EL producto ya esta en tu lista de favoritos", type:"angry"})
                }
                else{
                    showFloatMessage({title:"!", message:"Error al agregar el producto a favoritos", type:"angry"})
                }
            })
        }
    }

    //remove product from favorite list
    function removeFromFavoriteList(productId){
        if(infoUser.token === null){
            showFloatMessage({message:"Debes iniciar sesion para manejar tu lista de favoritos", type:"angry"})
        }else{
            removeProductOfFavoriteList({productId:productId, token:infoUser.token})
            .then(res => {
                if(res.status === 200){
                    showFloatMessage({title:"!", message:"Producto eliminado tu lista de favoritos", type:"success"})
                    setFavorite(false)
                }
                else{
                    showFloatMessage({title:"!", message:"Error al eliminar el producto de favoritos", type:"angry"})
                }
            })
        }
    }
    return {addToFavoriteList, removeFromFavoriteList}
}
