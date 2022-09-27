import React from 'react'
import NavBar from './components/NavBar'
import CategoriesNavBar from './components/CategoriesNavBar'
import GenerateCards from './components/GenerateCards'
import {CategoryContextProvider} from './context/CategoriesContext/index'
import './App.css';

function App() {
  return(
    <div className = "App">
      <CategoryContextProvider>
        <NavBar/>
        <CategoriesNavBar/>
        <GenerateCards />
      </CategoryContextProvider>
    </div>
  
  )
}

export default App;
