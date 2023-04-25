import {useEffect, useState} from 'react'

export function useNavigateItems(reference, items){
    /*This Hook recive an reference of an element with scroll and a list of items inside of the element. 
    Then navigate throw the items using cont = (index of item) and then using the scrollTo function set an scroll
    equal to the width of the reference*cont making posible a slider*/
    const [contador, setContador] = useState(0)
    let cont = contador

    //useEffect to control the interval of scrolling the items
    useEffect(() => {
        if(items.length > 0 && reference.current !== undefined){
            const interval = setInterval(() => seeCurrentItem(), 10000)
            return () => clearInterval(interval)
        }
    },[items, reference])

    //function to see the current item of the list
    function seeCurrentItem(){
        if(cont < items.length){
            cont += 1
            setContador(cont)
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

    //function to set the index of the element to see
    function updateCont(index){
        cont = index - 1
        setContador(cont)
        seeCurrentItem()
    }

    return {contador, updateCont}
}