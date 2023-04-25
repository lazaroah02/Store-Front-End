import {useEffect, useState, useRef} from 'react';

export function useIsNear(rootMargin = "150px"){
    const [isNear, setIsNear] = useState()
    const [stopObserving, setStopObserving] = useState()
    const reference = useRef()
    const rootReference = useRef()
    
    useEffect(() => {
        const onChange = (entries, observer) => {
            const element = entries[0]
            if(stopObserving){
                observer.disconnect()
            }
            if(element.isIntersecting){
                setIsNear(true)
            }
            else{
                setIsNear(false)
            }
        } 
        const observer = new IntersectionObserver(onChange, {root: rootReference.current, rootMargin: rootMargin}) 
        observer.observe(reference.current)
        return () => observer.disconnect()   
    })
    return({isNear, reference, setStopObserving, rootReference})
}