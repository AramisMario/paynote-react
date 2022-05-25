import React,{useEffect} from 'react';
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtMainCard } from '../DebtMainCard/DebtMainCard';
import {PaymentDetailList} from '../PaymentDetailList/PaymentDetailList';
import activeLoanListContext from '../../context/ActiveLoanListContext';
import { useLoanList } from '../../customHooks/useLoanList';

const ActiveLoansList = (props) =>{

    const {
        loanList,
        setLoanList,
        addPayment,
        cancelPayment,
        createPayment,
        isPaying,
        handleOpen,
        indexOpen,
        open} = useLoanList([]);

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
                cancelPayment
            }}>
                <ListGroup>
                    {loanList.map((loan,index) =>{
                        return (
                            <ListGroupItem key={`loan-${loan.id}`}>
                                <DebtMainCard loan={loan} handleOpen={() => handleOpen(index,loan)} addPayment={() => addPayment(index,loan)}/>
                                {
                                    loan["payments"].length > 0
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