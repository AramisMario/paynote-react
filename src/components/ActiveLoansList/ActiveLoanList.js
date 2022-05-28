import React,{useEffect,useState,useReducer} from 'react';
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtMainCard } from '../DebtMainCard/DebtMainCard';
// import {PaymentDetailList} from '../PaymentDetailList/PaymentDetailList';
import activeLoanListContext from '../../context/ActiveLoanListContext';
import { useLoanList } from '../../customHooks/useLoanList';
import { openIndexReducer } from '../../reducers/OpenIndexReducer';

const ActiveLoansList = (props) =>{

    const {
        loanList,
        setLoanList,
        addPayment,
        cancelPayment,
        createPayment,
        openManagerDispatcher,
        openManager
    } = useLoanList([]);

    useEffect(() => {
       Axios.get("http://127.0.0.1:4000/loans/showactive")
       .then((response) => {
            setLoanList(response.data);
       })
       .catch((error) => {
            console.log(error);
       });
    },[]);

    return (
        <React.Fragment>
            <activeLoanListContext.Provider value={{
                createPayment,
                cancelPayment,
                openManagerDispatcher,
                addPayment,
                openManager
                // handleOpen,
                // setIsPaying,
                // indexOpen,
                // isPaying,
                // open

            }}>
                <ListGroup>
                    {loanList.map((loan,index) =>{
                        return (
                            <ListGroupItem key={`loan-${loan.id}`}>
                                <DebtMainCard
                                    loan={loan} 
                                    index={index}
                                />
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </activeLoanListContext.Provider>
        </React.Fragment>
    );
}
export {ActiveLoansList};