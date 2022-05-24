import React from 'react';
import Axios from "axios";
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtMainCard } from '../DebtMainCard/DebtMainCard';
import {PaymentDetailList} from '../PaymentDetailList/PaymentDetailList';
import activeLoanListContext from '../../context/ActiveLoanListContext';


const ActiveLoansList = (props) =>{

    const [loanList, setLoanList] = useState([]);
    const [open,setOpen] = useState(false);
    const [indexOpen, setIndexOpen] = useState(-1);
    const [isPaying,setIsPaying] = useState(false);

    useEffect(() => {
       Axios.get("http://127.0.0.1:4000/loans/showactive")
       .then((response) => {
            setLoanList(response.data);
       })
       .catch((error) => {
            console.log(error);
       });
    },[]);

    const handleOpen = (index,loan) =>{
        if(loan.hasPayments){
            setOpen(!open);
        }else{
            setOpen(false);
        }
        setIndexOpen(index);
    }

    const addPayment = (index,loan) => {
        setIsPaying(true);
        let newLoanList = [...loanList];
        if(newLoanList[index]["payments"][0].loanId){
            newLoanList[index]["payments"].unshift({loanId:null,amount:0,payType:''});
            setLoanList(newLoanList);
        }
        handleOpen(index,loan);
    }

    const cancelPayment = (index) =>{
        if(!loanList[index]["payments"][0].loanId){
            let newLoanList = [...loanList];
            newLoanList[index]["payments"].shift();
            setLoanList(newLoanList);
            setIsPaying(false);
            setOpen(false);
            setIndexOpen(-1);
        }
    }

    const createPayment = (loanId,payType,amount) => {
        let date = new Date();
        let data = {
            loanId:loanId,
            payType: payType,
            paymentDate: date,
            amount:amount
        }
        Axios.post("http://127.0.0.1:4000/payments/create",data)
        .then((response) => {
            setLoanList(response.data);
            setIsPaying(false);
            setOpen(false);
            setIndexOpen(-1);
        })
        .catch((error) => {
            console.log(error);
       });
    }

    return (
        <React.Fragment>
            <activeLoanListContext.Provider value={{
                createPayment,
                cancelPayment
            }}>
                <ListGroup>
                    {loanList.map((loan,index) =>{
                        return (
                            <ListGroupItem key={`loan-${loan.id}`}>
                                <DebtMainCard loan={loan} handleOpen={() => handleOpen(index,loan)} addPayment={() => addPayment(index,loan)}/>
                                {
                                    loan.hasPayments 
                                    && open 
                                    && index === indexOpen 
                                    && 
                                    <PaymentDetailList 
                                        payments={loan.payments} 
                                        isPaying={isPaying}
                                        loanId={loan.id}
                                    />
                                }
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </activeLoanListContext.Provider>
        </React.Fragment>
    );
}
export {ActiveLoansList};