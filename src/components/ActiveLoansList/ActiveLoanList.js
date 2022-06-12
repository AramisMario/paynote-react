import React,{useEffect,useContext} from 'react';
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtMainCard } from '../DebtMainCard/DebtMainCard';
import activeLoanListContext from '../../context/ActiveLoanListContext';
// import { useLoanList } from '../../customHooks/useLoanList';
import "./ListGroupItem.css";
import Card from "react-bootstrap/Card";

const ActiveLoansList = (props) =>{
    const value = useContext(activeLoanListContext);
    useEffect(() => {
       Axios.get("http://127.0.0.1:4000/loans/showactive")
       .then((response) => {
            value.setLoanList(response.data);
       })
       .catch((error) => {
            console.log(error);
       });
    },[]);

    return (
            <React.Fragment>
                <div style={{width: '28rem'}}>
                {/* <Card style={{ width: '28rem' }}> */}
                        <ListGroup>
                            {value.loanList.map((loan,index) =>{
                                return (
                                    <ListGroupItem className="listGroupItem" key={`loan-${loan.id}`}>
                                        <DebtMainCard
                                            loan={loan} 
                                            index={index}
                                        />
                                    </ListGroupItem>
                                );
                            })}
                        </ListGroup>
                {/* </Card> */}
                </div>
            </React.Fragment>
    );
}
export {ActiveLoansList};