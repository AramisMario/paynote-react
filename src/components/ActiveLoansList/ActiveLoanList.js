import React,{useEffect,useState,useReducer} from 'react';
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtMainCard } from '../DebtMainCard/DebtMainCard';
import activeLoanListContext from '../../context/ActiveLoanListContext';
import { useLoanList } from '../../customHooks/useLoanList';
import Card from "react-bootstrap/Card";

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
                <Card style={{ width: '28rem' }}>
                    <activeLoanListContext.Provider value={{
                        createPayment,
                        cancelPayment,
                        openManagerDispatcher,
                        addPayment,
                        openManager
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
                </Card>
            </React.Fragment>
    );
}
export {ActiveLoansList};