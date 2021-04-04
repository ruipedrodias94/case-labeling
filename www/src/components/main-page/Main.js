import { Container, Row, Col } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";

import Navbar from "../navbar/Navbar";

import { axiosRequest } from "../../helpers/requests/axios";
import CaseArea from "./CaseArea";
import ConditionsArea from "./ConditionsArea";
import ToastComponent from "./ToastComponent";

const Gallery = (props) => {
  const [conditions, setConditions] = useState([]);

  const [cases, setCases] = useState([]);

  const [caseIndex, setCaseIndex] = useState(0);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const responseConditions = await axiosRequest(
        "GET",
        `${process.env.REACT_APP_API_URL}/v1/icd/all/`,
        "application/json",
        null,
        true,
        null,
        null
      );
      if (responseConditions.status === 200) {
        setConditions(responseConditions.data.idcs);
      }

      const responseCases = await axiosRequest(
        "GET",
        `${process.env.REACT_APP_API_URL}/v1/ehr/all/`,
        "application/json",
        null,
        true,
        null,
        null
      );

      if (responseCases.status === 200) {
        setCases(responseCases.data.ehrs);
      }
    };

    getData();
  }, []);

  return (
    <React.Fragment>
      <Navbar />

      <Container>
        <Row>
          <Col>
            <CaseArea caseElement={cases[caseIndex]} />
          </Col>
          <Col>
            <ConditionsArea
              conditions={conditions}
              setCaseIndex={setCaseIndex}
              caseIndex={caseIndex}
              cases={cases}
              caseElement={cases[caseIndex]}
              setShow={setShow}
            />
          </Col>
        </Row>
        <ToastComponent show={show} setShow={setShow} />
      </Container>
    </React.Fragment>
  );
};

export default trackWindowScroll(Gallery);
