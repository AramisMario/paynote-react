import React, { useState } from "react";
import {Button,Modal,Form} from "react-bootstrap";

const MyModal = (props) =>{
    
    const [form,setForm] = useState({debtorId:null,description:'',amount:0}); 
    const {createLoan,...rest} = props;
    return (
        <Modal
          {...rest}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Ingrese datos del prestamo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Monto</Form.Label>
               <Form.Control 
                  type="number"  
                  placeholder="Enter ammount"
                  onChange={(event) => setForm({...form,amount:event.target.value})}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Select 
                    name="type" 
                    defaultValue={form.debtorId}
                    onChange={(event)=>setForm({...form,debtorId:event.target.value})}
                    aria-label="Default select example"
                >
                  <option value={null}>Seleccione...</option>
                  {props.debtors.map((debtor,index) => {
                    return (
                      <option  
                        key={`loan-create-debtor-${debtor.id}`}
                        value={debtor.id}
                      >{debtor.name}</option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" onChange={(event) => setForm({...form,description:event.target.value})}/>
              </Form.Group>
              
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {createLoan(form,setForm)}}>Guardar</Button>
          </Modal.Footer>
        </Modal>
      );
}

export {MyModal};