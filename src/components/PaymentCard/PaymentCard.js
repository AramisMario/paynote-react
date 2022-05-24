import React, { useContext, useState } from "react";
import activeLoanListContext from "../../context/ActiveLoanListContext";
const PaymentCard = ({payment,isPaying,index,loanId}) =>{

    const [type,setType] = useState('INTERES');
    const [amount, setAmount] = useState(0);
    const value = useContext(activeLoanListContext);

    return (
        <div className='details'>
            <hr></hr>
            {isPaying && index === 0 ? (
                <React.Fragment>
                <h6>Monto:</h6>
                <input type="number" onChange={(event) => setAmount(event.target.value)}/>
                <br></br>
                <h6>Tipo:</h6>
                <select name="type" defaultValue={type} onChange={() => setType(type)}>
                  <option value="INTERES">Interes</option>
                  <option value="ABONO" >Abono</option>
                </select>
               <button onClick={()=> value.createPayment(loanId,type,amount)}>Agregar</button>
               <button onClick={()=> value.cancelPayment(index)}>Cancelar</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h6>Pago: {payment.amount}</h6>
                    <br></br>
                    <h6>Fecha: {payment.paymentDate}</h6>
                    <br></br>
                    <h6>Tipo: {payment.payType}</h6>
                </React.Fragment>
            )}
            
        </div>
    );
}

export {PaymentCard};