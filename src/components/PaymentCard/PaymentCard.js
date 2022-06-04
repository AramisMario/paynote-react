import React, { useContext, useState } from "react";
import activeLoanListContext from "../../context/ActiveLoanListContext";
import {Button,Form} from "react-bootstrap";
import "./PaymentCard.css";
const PaymentCard = ({payment,isPaying,index,loanId,interest}) =>{

    const [type,setType] = useState('INTERES');
    const [placeholder,setPlaceholder] = useState(interest);
    const [amount, setAmount] = useState(0);
    const value = useContext(activeLoanListContext);

    const changeType = (type) => {
        if(type === "INTERES"){
            setPlaceholder(interest);
        }else{
            setPlaceholder("Enter amount");
        }
        setType(type);
    }

    return (
        <div className='details'>
            <hr></hr>
            {value.openManager.isPaying && index === 0 ? (
                <React.Fragment>
                    <div className="FormGroupTipoMonto">
                        <div className="tipo">

                            <Form.Group>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select 
                                    name="type" 
                                    defaultValue={type} 
                                    placeholder={placeholder}
                                    onChange={(event) => changeType(event.target.value)}
                                    aria-label="Default select example"
                                >
                                    <option value="INTERES">Interes</option>
                                    <option value="ABONO" >Abono</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="monto">
                            <Form.Group className="mb-3">
                               <Form.Label>Monto</Form.Label>
                               <Form.Control 
                                type="number"  
                                placeholder={placeholder}
                                onChange={(event) => setAmount(event.target.value)}
                                />
                             </Form.Group>
                        </div>
                    </div>
                    <br></br>
                    <div className="AcceptCancelButtons">
                        <Button onClick={()=> value.createPayment(loanId,type,amount)}>Agregar</Button>
                        <Button onClick={()=> value.cancelPayment(index)}>Cancelar</Button>
                    </div>  
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h6>Pago: {Intl.NumberFormat('en-US',{currency:'COP'}).format(payment.amount)}</h6>
                    <br></br>
                    <h6>Fecha: {new Date(payment.paymentDate).toLocaleString('fr')}</h6>
                    <br></br>
                    <h6>Tipo: {payment.payType}</h6>
                </React.Fragment>
            )}
            
        </div>
    );
}

export {PaymentCard};