import React from 'react';
import Toast from 'react-bootstrap/Toast';
import "./index.css"

function ShowFloatMessage({show, setShow, title = "", message = "", type = "success"}) {
  return (
    <>
        {show?
            <div className = "toast-container" >
                <Toast show={show} onClose = {() => setShow(false)} delay={2000} autohide = {true}>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body className = {type}>{message}</Toast.Body>
                </Toast>
            </div>
        :null}
    </>
  );
}

export default ShowFloatMessage;