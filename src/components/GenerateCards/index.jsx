import {useEffect, useState, useContext} from 'react'
import GetProducts from '../../services/getProducts'
import ProgresGif from '../ProgresGif'
import Card from '../Card'
import CategoriesContext from '../../context/CategoriesContext'

export default function GenerateCard(){
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const categoryContext = useContext(CategoriesContext)
    const {category, setCategory} = categoryContext

    useEffect(() => {
        setLoading(true)
        GetProducts(category).then(data => {
        setProduct(data)
        setLoading(false)
        })
    },[category])
    return(
        <div>
            {loading?<div className ="cargando"><ProgresGif/></div>:null }
            <div className = "ProductsContainer">
                {products.map(product =><Card key ={product.id}{...product}/>)}
            </div>
        </div>
        
    )
}
