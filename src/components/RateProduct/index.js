import React, {useState} from "react";
import EmptyStar from '../../assets/empty-star.svg'
import FullyStar from '../../assets/fully-star.svg'
import { rateProduct } from "../../services/rateProduct";
import './index.css'

function RateProduct({userToken, productId, userId}) {
    const [score, setScore] = useState(0)
    const [comment, setComment] = useState("")

    function handleSendScore(){
        if(score > 0){
            rateProduct({
                score:score, 
                productId:productId, 
                userToken:userToken, 
                comment:comment, 
                userId:userId})
            .then(res => {
                if(res.status === 200){
                    alert("Puntuacion enviada correctamente")
                }
                else{console.log(res)}
            })
        }
    }

    function handleShowFullyOrEmptyStars(starNumber){
        setScore(starNumber)
        //set empty stars for all img
        for(let i=1; i <= 5; i++){
            document.getElementById(`star${i}`).setAttribute("src",`${EmptyStar}`)
        }
        //set fully stars for all the img lower than selected one
        for(let i=1; i <= starNumber; i++){
            document.getElementById(`star${i}`).setAttribute("src",`${FullyStar}`)
        }
    }

    return( 
        <div className = "rate-product-container">
            <h5 className = "rate-product-title">Puntuar Producto</h5>
            <div className = "rate-product-stars-container">
                <img id = "star1" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(1)}/>
                <img id = "star2" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(2)}/>
                <img id = "star3" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(3)}/>
                <img id = "star4" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(4)}/>
                <img id = "star5" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(5)}/>
            </div>
            <form>
                <textarea type = "text" value = {comment} onChange={(e) => setComment(e.target.value)}/>
            </form>
            <div className = "button-submit-container">
                <button className = "btn" onClick={() => handleSendScore()}>Enviar</button>
            </div>
        </div>
        );
}

export default RateProduct;
