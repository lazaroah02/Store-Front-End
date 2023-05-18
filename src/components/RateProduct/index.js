import React, {useState} from "react";
import EmptyStar from '../../assets/empty-star.svg'
import FullyStar from '../../assets/fully-star.svg'
import { rateProduct } from "../../services/rateProduct";
import './index.css'

function RateProduct({userToken, productId, userId}) {
    const [score, setScore] = useState(0)
    const [comment, setComment] = useState("")
    const [disabled, setDisabled] = useState(false)

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
                    setDisabled(true)
                }
                else{console.log(res)}
            })
        }
    }

    function handleShowFullyOrEmptyStars(starNumber){
        if(!disabled){
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
    }

    return( 
        <div className = "rate-product-container">
            <section className = "stars-and-button-container">
                <div className = "rate-product-stars-container">
                    <img id = "star1" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(1)}/>
                    <img id = "star2" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(2)}/>
                    <img id = "star3" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(3)}/>
                    <img id = "star4" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(4)}/>
                    <img id = "star5" alt = "star" className = "star" src = {EmptyStar} onClick={() => handleShowFullyOrEmptyStars(5)}/>
                </div>
                <div className = "button-submit-container">
                    <button className = "btn" onClick={() => handleSendScore()} disabled = {disabled}>Enviar</button>
                </div>
            </section>
            <form className = "form-comment">
                <textarea type = "text" value = {comment} disabled = {disabled} placeholder = "Escribe un comentario ..." onChange={(e) => setComment(e.target.value)}/>
            </form>
        </div>
        );
}

export default RateProduct;
