import { Button, Form } from "react-bootstrap";

import React, { useState } from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { axiosRequest } from "../../helpers/requests/axios";

const ConditionsArea = (props) => {
  const [condition, setCondition] = useState(null);

  const incrementCaseIndex = (e) => {
    e.preventDefault();

    let newProp = props.caseIndex;

    if (newProp <= props.cases.length - 1) {
      newProp += 1;
      props.setCaseIndex(newProp);
    }
  };

  const labelCase = async (e) => {
    e.preventDefault();

    if (condition) {
      const responseConditions = await axiosRequest(
        "POST",
        `${process.env.REACT_APP_API_URL}/v1/ehr/label/`,
        "application/json",
        null,
        true,
        {
          id: props.caseElement._id,
          labelId: condition._id,
        },
        null
      );

      if (responseConditions.status === 200) {
        props.setShow(true);
      }
      incrementCaseIndex(e);
    } else {
      alert("Select a condition first");
    }
  };

  return (
    <div>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Select condition</Form.Label>
        <Form.Control
          as="select"
          multiple
          onClick={(event) => {
            const condition = props.conditions.find(
              (conditionElement) =>
                conditionElement.description === event.target.value
            );
            setCondition(condition);
          }}
        >
          {props.conditions
            ? props.conditions.map((conditionElement, index) => (
                <option key={index}>{conditionElement.description}</option>
              ))
            : null}
        </Form.Control>
      </Form.Group>
      {props.caseElement ? (
        <Button
          className="w-100 mt-3"
          onClick={async (e) => {
            labelCase(e);
          }}
        >
          Next case
        </Button>
      ) : null}
    </div>
  );
};

export default trackWindowScroll(ConditionsArea);
