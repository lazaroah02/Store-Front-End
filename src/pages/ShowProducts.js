import React,{useState, useRef, useEffect, useContext} from 'react';
import NavBar from '../components/NavBar'
import GenerateCards from '../components/GenerateCards';
import FiltersNavBar from '../components/FiltersNavBar';
import ReactPaginate from 'react-paginate';
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import { createNewPathName } from '../helpFunctions/createNewPathName';
import ButtonGoTop from '../components/ButtonGoTop'
import getProducts from "../services/getProducts";
import {getIdOfProductsInFavoriteList} from '../services/getIdOfProductsInFavoriteList'
import InfoUserContext from '../context/InfoUserContext';
import './pagesStyles/showProducts.css'

export default function ShowProducts(){
    const keyword = useParams()
    const [pageSize, setPageSize] = useState(0)
    const startRef = useRef()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [favoriteProducts, setFavoriteProducts] = useState([])
    const {infoUser} = useContext(InfoUserContext)

    function handleSetPage(page) {
        navigate(createNewPathName(pathname, "page", page.selected + 1));
      }
    
    useEffect(() => {
        startRef.current.scrollIntoView({block:'center',inline:"center"})
        setLoading(true)
        getProducts(keyword.filters)
        .then(data => {
            setPageSize(data.count)
            setProducts(data.results)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
            setPageSize(0)
        })
    }, [keyword])

    useEffect(() => {
        if(infoUser.token !== null){
            getIdOfProductsInFavoriteList({token:infoUser.token})
            .then(data => {
                setFavoriteProducts(data.products)
            })
        }
    },[infoUser])

    return(
        <div className = "ShowProducts">
            <NavBar />
            <ButtonGoTop topRef = {startRef}/>
            <FiltersNavBar topRef = {startRef}/>
            <GenerateCards 
                products = {products}
                loading = {loading}
                favoriteProducts = {favoriteProducts}
                />
            <ReactPaginate
                className = {"paginator"}
                activeClassName = {"page-active"}
                pageClassName = {"page"}
                nextLinkClassName = {"next-page-button"}
                previousLinkClassName = {"previous-page-button"}
                breakClassName = {'page'}
                pageCount = {Math.ceil(pageSize/20)}
                pageRangeDisplayed = {3}
                previousLabel = {'<<'}
                nextLabel = {'>>'}
                breakLabel = {"..."}
                marginPagesDisplayed = {1}
                onPageChange={handleSetPage}
                initialPage = {0}
            />    
        </div>    
    )
}