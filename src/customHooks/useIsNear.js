import {useEffect, useState, useRef} from 'react';

export function useIsNear(){
    const [isNear, setIsNear] = useState()
    const [stopObserving, setStopObserving] = useState(false)
    const reference = useRef()
    
    useEffect(() => {
        const onChange = (entries, observer) => {
            const element = entries[0]
            if(stopObserving)observer.disconnect()
            if(element.isIntersecting){
                setIsNear(true)
            }
            else{
                setIsNear(false)
            }
        }    
        const observer = new IntersectionObserver(onChange, {rootMargin: '150px'}) 
        observer.observe(reference.current)
        return () => observer.disconnect()   
    })
    return([isNear, reference, setStopObserving])
}