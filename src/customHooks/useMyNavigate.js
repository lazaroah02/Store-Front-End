import {useNavigate} from 'react-router-dom'
export function useMyNavigate(){
    const navigate = useNavigate()

    function myNavigate(path){
        window.scrollTo(0,0)
        navigate(path)
    }

    return myNavigate
}