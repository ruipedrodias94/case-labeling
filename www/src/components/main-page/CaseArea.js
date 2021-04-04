import { Form } from "react-bootstrap";

import React from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";

const CaseArea = (props) => {
  return props.caseElement ? (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Please review this case</Form.Label>
      <Form.Control
        readOnly
        as="textarea"
        value={props.caseElement ? props.caseElement.description : ""}
      />
    </Form.Group>
  ) : (
    "You are Done"
  );
};

export default trackWindowScroll(CaseArea);
