import React from "react";
const PaymentCard = ({payment,isPaying,index}) =>{
    return (
        <div className='details'>
            <hr></hr>
            {isPaying && index === 0 ? (
                <React.Fragment>
                <h6>Monto:</h6>
                <input type="number"/>
                <br></br>
                <h6>Tipo:</h6>
                <select name="type" defaultValue="INTERES">
                  <option value="INTERES">Interes</option>
                  <option value="ABONO" >Abono</option>
                </select>
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