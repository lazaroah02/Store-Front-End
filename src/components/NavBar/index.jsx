import './index.css'
import {useContext} from 'react'
import CategoriesContext from '../../context/CategoriesContext'

export default function NavBar(){
    const categoryContext = useContext(CategoriesContext)
    const {category, setCategory} = categoryContext
    return(
        <div className = "NavBar">
            <div className = "Logo">
                Store
            </div>
            <div className = "ul">
                <button onClick = {() => setCategory(0)} >Home</button><a href="/" >About us</a><a href="/" >Store</a>
            </div>
        </div>
    )
}