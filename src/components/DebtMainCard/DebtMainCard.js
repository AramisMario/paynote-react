import React,{useRef,useState} from "react";
import {PaymentDetailList} from '../PaymentDetailList/PaymentDetailList';
import activeLoanListContext from "../../context/ActiveLoanListContext"; 
import { useContext } from "react";
import { Button, Overlay, Tooltip, Popover } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { usePopover } from "../../customHooks/usePopover";
const DebtMainCard = ({loan,index}) =>{


    const {show,
        target,
        verifyPayments} = usePopover({defaultShow:false,defaultTarget:null});
    const value = useContext(activeLoanListContext);

    const handleViewChart = () =>{
        value.setViewChart(true);

        let interest = loan.payments.map((payment) => {
            if(payment.payType === "INTERES"){
                return Number.parseFloat(payment.amount);
            }else{
                return 0;
            }
        });

        let abonos = loan.payments.map((payment) => {
            if(payment.payType === "ABONO"){
                return Number.parseFloat(payment.amount);
            }else{
                return 0;
            }
        });

        let dates = loan.payments.map((payment) => payment.paymentDate);

        let serie = [
            {name:'INTERES', data:interest},
            {name:'ABONO', data:abonos}
        ];
        value.setSeriesAndCategories(serie,dates);
    }


    return (
        <div className="Main">
            <div className="CardHeader">
                <div ref={target} onClick={() => {
                        verifyPayments(loan);
                        value.openManagerDispatcher({type:'OPEN_INDEX',indexOpen:index});
                    }}>
                    <h6>Deudor: {loan.debtor.name}</h6>
                    <br></br>
                    <h6>Monto: {Intl.NumberFormat('en-US',{currency:'COP'}).format(loan.amount)}</h6>
                    <br></br>
                    <h6>Porcentaje: {loan.interest_percentage}%</h6>
                    <br></br>
                    <h6>Abierto: {new Date(loan.loanDate).toLocaleString('fr')}</h6>
                    <br></br>
                    <h6>Deuda actual: {Intl.NumberFormat('en-US',{currency:'COP'}).format(loan.current_debt)}</h6>
                    <br></br>
                </div>
                
                <Overlay target={target.current} show={show} placement="right">
                    <Popover id="popover-basic">
                        <Popover.Body>
                          No hay información de pagos disponibles para el prestamo seleccionado
                        </Popover.Body>
                    </Popover>
                </Overlay>

                <Button variant="primary" onClick={() => value.addPayment(index)}>Agregar pago</Button>
                <Button variant="info" onClick={() => handleViewChart()}>Graficar</Button>
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
                        interest={loan.interest_amount}
                    />
                }
                
            </div>
        </div>
    );
}


export {DebtMainCard};