import { Col, Form, Button } from "react-bootstrap";

import { useState } from "react";

import { axiosRequest } from "../../helpers/requests/axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    const responseToken = await axiosRequest(
      "POST",
      `${process.env.REACT_APP_API_URL}/v1/user/login`,
      "application/json",
      null,
      true,
      { email: email, password: password },
      null
    );

    if (responseToken.status === 200) {
      props.history.push("/image-overview");
    }
  };

  return (
    <div>
      <h3 className="mb-4">Welcome to the Doctor Case Label platform</h3>
      <Col md={{ span: 3 }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="border-gray"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className=" border-gray"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Button
            className="d-block mx-auto mt-4 px-4"
            onClick={() => submitForm()}
          >
            Login
          </Button>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
