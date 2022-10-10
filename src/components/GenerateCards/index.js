import React,{useEffect, useState, useContext} from 'react'
import GetProducts from '../../services/getProducts'
import ProgresGif from '../ProgresGif'
import Card from '../Card'
import CategoriesContext from '../../context/CategoriesContext'
import '../../vendor/bootstrap/css/bootstrap.min.css'
import './index.css'
import InfoSearchedProduct from '../../context/InfoSearchedProduct'

export default function GenerateCard(){
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const {category} = useContext(CategoriesContext)
    const {infoSearchedProduct} = useContext(InfoSearchedProduct)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        GetProducts(category, page).then(data => {
        setProduct(data)
        setLoading(false)
        })
    },[category, page])

    useEffect(() => {
        setProduct(infoSearchedProduct)
    },[infoSearchedProduct])

    return(
        <div >
            {loading?<div className ="cargando"><ProgresGif/></div>:null }
            <p id = 'start'></p>
            <div className = " ProductsContainer row justify-content-center">
                {products[0] === 'Not Found'?
                'Not Found':
                products.map(product =><Card key ={product.id}{...product}/>)
                } 
            </div>
            <div>
                {page > 1?<button onClick = {() => setPage(page - 1)}>Preview</button>:null}
                <button onClick = {() => {
                    setPage(page + 1)
                    }}>Next</button>
                </div>
        </div>
        
    )
}
