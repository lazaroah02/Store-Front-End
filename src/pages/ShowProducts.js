import React,{useState, useRef} from 'react';
import NavBar from '../components/NavBar'
import GenerateCards from '../components/GenerateCards';
import FiltersNavBar from '../components/FiltersNavBar';
import ReactPaginate from 'react-paginate';
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import { createNewPathName } from '../helpFunctions/createNewPathName';
import ButtonGoTop from '../components/ButtonGoTop'
import './pagesStyles/showProducts.css'

export default function ShowProducts(){
    const keyword = useParams()
    const [pageSize, setPageSize] = useState(0)
    const startRef = useRef()
    const navigate = useNavigate()
    const {pathname} = useLocation()

    function handleSetPage(page) {
        navigate(createNewPathName(pathname, "page", page.selected + 1));
      }

    return(
        <div className = "ShowProducts">
            <NavBar />
            <ButtonGoTop topRef = {startRef}/>
            <FiltersNavBar topRef = {startRef}/>
            <GenerateCards 
                keyword = {keyword} 
                setPageSize={setPageSize} 
                startRef = {startRef} 
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