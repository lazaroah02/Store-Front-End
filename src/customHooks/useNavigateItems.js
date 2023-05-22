import {useEffect, useState} from 'react'

export function useNavigateItems(reference, useInterval = true){
    /*This Hook recive an reference of an element with scroll and a list of items inside of the element. 
    Then navigate throw the items using cont = (index of item) and then using the scrollTo function set an scroll
    equal to the width of the reference*cont making posible a slider*/
    const [contador, setContador] = useState(0)
    let cont = contador

    //useEffect to control the interval of scrolling the items
    useEffect(() => {
        console.log(useInterval)
        if(reference.current !== undefined && useInterval){
            const i = setInterval(() => seeCurrentItem(), 5000)
            return () => clearInterval(i)
        }
    },[reference, cont])

    //function to see the current item of the list
    function seeCurrentItem(){
        if(reference.current !== undefined){
            let itemsLength = Math.round(reference.current.scrollWidth/reference.current.offsetWidth)
            cont += 1
            setContador(cont)
            if(cont < itemsLength){
                reference.current.scrollTo({
                    top:0, 
                    left:reference.current.offsetWidth*cont,
                    behavior:"smooth",
                })
            }
            //de lo contrario es pq el contador es igual al numero de elementos por lo que lo volvemos a poner en su valor inicial
            else{ 
                cont = -1
                setContador(cont)
                seeCurrentItem()
            } 
        }
        
    }

    //function to set the index of the element to see
    function updateCont(index){
        cont = index - 1
        setContador(cont)
        seeCurrentItem()
    }

    return {contador, updateCont}
}