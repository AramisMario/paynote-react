import React from "react";
import {PaymentDetailList} from '../PaymentDetailList/PaymentDetailList';
import activeLoanListContext from "../../context/ActiveLoanListContext"; 
import { useContext } from "react";

const DebtMainCard = ({loan,index}) =>{
    const value = useContext(activeLoanListContext);
    return (
        <div className="Main">
            <div className="CardHeader">
                <div onClick={() => {
                    // value.handleOpen(index,loan,value.isPaying);
                    value.openManagerDispatcher(
                        {
                            type:'OPEN_INDEX',
                            indexOpen:index
                        })}}>
                    <h6>Deudor: {loan.debtor.name}</h6>
                    <br></br>
                    <h6>Monto: {loan.amount}</h6>
                    <br></br>
                    <h6>Abierto: {new Date(loan.loanDate).toLocaleString('fr')}</h6>
                    <br></br>
                    <h6>Deuda actual: {loan.current_debt}</h6>
                    <br></br>
                </div>
                <button onClick={() => value.addPayment(index)}>Agregar pago</button>
            </div>
            <div className="CardDetails">
                {
                    loan["payments"].length > 0
                    &&
                    value.openManager
                    &&
                    index === value.openManager.indexOpen
                    &&
                    // && value.open 
                    // && index === value.indexOpen 
                    // && 
                    <PaymentDetailList
                        payments={loan.payments} 
                        // isPaying={value.isPaying}
                        isPaying={false}
                        loanId={loan.id}
                    />
                }
                
            </div>
        </div>
    );
}


export {DebtMainCard};