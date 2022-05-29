import React,{useEffect,useState} from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { DebtorCard } from "../DebtorCard/DebtorCard";
const DebtorList = (props) => {

    const [debtorList,setDebtorList] = useState([]);

    useEffect(()=>{
        Axios.get('http://127.0.0.1:4000/debtors/alldebtors')
        .then((response) => {
            setDebtorList(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);

    return (
        <React.Fragment>
            <Card style={{ width: '28rem' }}>
                <ListGroup>
                    {debtorList.map((debtor,index) => {
                        return (
                            <ListGroupItem key={`debtor-${debtor.id}`}>
                                <DebtorCard debtor={debtor}/>
                            </ListGroupItem>    
                        );
                    })}
                   
                </ListGroup>
            </Card>
        </React.Fragment>
    );
}

export {DebtorList};