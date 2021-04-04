import { Toast } from "react-bootstrap";

import React from "react";

const ToastComponent = (props) => {
  return (
    <Toast
      onClose={() => props.setShow(false)}
      show={props.show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">Success</strong>
      </Toast.Header>
      <Toast.Body>You've labeled a case with success!</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
