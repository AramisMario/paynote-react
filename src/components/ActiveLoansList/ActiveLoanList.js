import React from 'react';
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtMainCard } from '../DebtMainCard/DebtMainCard';
import {PaymentDetailList} from '../PaymentDetailList/PaymentDetailList';
import { useState, useEffect } from 'react';

const ActiveLoansList = (props) =>{

    const [loanList, setLoanList] = useState([]);
    const [open,setOpen] = useState(false);
    const [indexOpen, setIndexOpen] = useState(-1);
    const [isPaying,setIsPaying] = useState(false);

    useEffect(() => {
       Axios.get("http://127.0.0.1:4000/loans/showactive")
       .then((result) => {
            setLoanList(result.data);
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
        newLoanList[index]["payments"].unshift({loanId:null,amount:0,payType:''});
        // console.log("new: ",newLoanList);
        setLoanList(newLoanList);
        handleOpen(index,loan);
    }

    return (
        <React.Fragment>
            <ListGroup>
                {loanList.map((loan,index) =>{
                    return (
                        <ListGroupItem key={`loan-${loan.id}`}>
                            <DebtMainCard loan={loan} handleOpen={() => handleOpen(index,loan)} addPayment={() => addPayment(index,loan)}/>
                            {
                                loan.hasPayments 
                                && open 
                                && index === indexOpen 
                                && <PaymentDetailList payments={loan.payments} isPaying={isPaying} />
                            }
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </React.Fragment>
    );
}
export {ActiveLoansList};