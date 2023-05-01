import React from 'react';
import EmptyStar from '../../assets/empty-star.svg'
import FullyStar from '../../assets/fully-star.svg'
import './index.css'

export default function ShowProductScore({score}){
    function generateStars(){
        let listOfStars = Array(5).fill(null)
        //fill the array with empty stars
        for(let i = 0; i < 5; i++){
            listOfStars[i] = React.createElement("img", {"src":`${EmptyStar}`, "key": i, "alt":"empty-star"})
        }
        //replace the empty stars of the array with fully stars equal to the score of the product
        for(let i = 0; i < score; i++){
            listOfStars[i] = React.createElement("img", {"src":`${FullyStar}`, "key":i, "alt":"full-star"})
        }
        return listOfStars
    }
    return(
        <div className = "stars-container">
            {generateStars().map(star => star)}
        </div>
    )
}