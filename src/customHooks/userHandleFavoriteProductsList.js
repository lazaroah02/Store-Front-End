import {useState, useEffect, useContext} from 'react';
import {addProductToFavoriteList} from '../../services/addProductToFavoriteList'
import {removeProductOfFavoriteList} from '../../services/removeProductOfFavoriteList'
import {getIdOfProductsInFavoriteList} from '../services/getIdOfProductsInFavoriteList'
import InfoUserContext from '../context/InfoUserContext';

export function useHandleFavoriteProductsList({}){
    const [favoriteProducts, setFavoriteProducts] = useState(null)
    const {infoUser} = useContext(InfoUserContext)

    useEffect(() => {
        if(infoUser.token !== null){
            getIdOfProductsInFavoriteList({token:infoUser.token})
            .then(data => {
                setFavoriteProducts(data.products)
            })
        }
    },[infoUser])
    
    function productInFavoriteList(productId){
        if(favoriteProducts !== null){
            return favoriteProducts.indexOf(productId) === -1?false:true
        }
    }

    function handleAddToFavorite(productId){
        addProductToFavoriteList({productId:productId, token:infoUser.token})
        .then(res => {
            if(res.status === 200){
            setMessage({title:"!", message:"Producto agregado a tu lista de favoritos", type:"success"})
            setShowMessage(true)
            setFavorite(true)
            }
            else if(res.status === 226){
            setMessage({title:"!", message:"EL producto ya esta en tu lista de favoritos", type:"angry"})
            setShowMessage(true)
            }
            else{
            setMessage({title:"!", message:"Error al agregar el producto a favoritos", type:"angry"})
            setShowMessage(true)
            }
        })
    }

    function handleRemoveOfFavoriteList(productId){
        removeProductOfFavoriteList({productId:productId, token:infoUser.token})
        .then(res => {
            if(res.status === 200){
            setMessage({title:"!", message:"Producto eliminado tu lista de favoritos", type:"success"})
            setShowMessage(true)
            setFavorite(false)
            }
            else{
            setMessage({title:"!", message:"Error al eliminar el producto de favoritos", type:"angry"})
            setShowMessage(true)
            }
        })
    }
    return {handleAddToFavorite, handleRemoveOfFavoriteList, productInFavoriteList, }
}
