import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import "./index.css"

function ShowFloatMessage({title, message}) {
  const [show, setShow] = useState(true);

  return (
    <>
        {show?
            <div className = "toast-container" delay={2000} autohide = {false}>
                <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide = {false}>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
                </Toast>
            </div>
        :null}
    </>
  );
}

export default ShowFloatMessage;