import React from "react";

const DebtMainCard = ({loan,handleOpen,addPayment}) =>{
    console.log("teh LOAN: ",loan);
    return (
        <div className='Main'>
            <div onClick={handleOpen}>
                <h6>Deudor: {loan.debtor.name}</h6>
                <br></br>
                <h6>Monto: {loan.amount}</h6>
                <br></br>
                <h6>Abierto: {loan.loanDate}</h6>
                <br></br>
                <h6>Deuda actual: {loan.current_debt}</h6>
                <br></br>
            </div>
            <button onClick={addPayment}>Agregar pago</button>
        </div>
    );
}


export {DebtMainCard};