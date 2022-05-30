import React from "react";

const HistoricalPaymentCard = (props) =>{
    const {payment} = props;
    return (
        <div className="Main">
            <div className="CardHeader">
                <div>
                    <h6>Monto: {payment.amount}</h6>
                    <br></br>
                    <h6>Fecha: {payment.paymentDate}</h6>
                    <br></br>
                    <h6>Tipo: {payment.payType}</h6>
                    <br></br>
                    <h6>Deudor: {payment.loan.debtor.name}</h6>
                </div>
            </div>
        </div>
    );
}

export {HistoricalPaymentCard};