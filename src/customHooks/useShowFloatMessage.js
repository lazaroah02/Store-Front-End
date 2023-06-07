import React, {useState} from 'react'
import ShowFloatMessage from '../components/ShowFloatMessage';
import ReactDOM from 'react-dom/client';

export function useShowFloatMessage({parentRef}){
    const [show, setShow] = useState(false)

    function showFloatMessage({title = "", message = "", type = "success"}){
        setShow(true)
        const floatMessage = <ShowFloatMessage title = {title} message = {message} type = {type} show={show} setShow={setShow}/>;
        //const floatMessage = <p>Hello</p>
        console.log(floatMessage)
        const floatMessageDOM = React.createElement(floatMessage.type, floatMessage.props, floatMessage.props.children);
        let root = ReactDOM.createRoot(parentRef.current)
        root.render(floatMessageDOM)
        // Agregarlo al div usando current.appendChild
        //parentRef.current.appendChild(floatMessageDOM);
        
    }

    return {showFloatMessage}
}