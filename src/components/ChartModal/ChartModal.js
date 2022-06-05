import React, { useState } from "react";
import {Modal} from "react-bootstrap";
import { Chart } from "../Chart/Chart";
const ChartModal = (props) =>{

    const {options,...rest} = props;
    return (
        <Modal
          {...rest}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Grafica de detalles
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
                <Chart options={options}/>
            </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      );
}

export {ChartModal};