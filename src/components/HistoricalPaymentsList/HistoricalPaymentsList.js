import React,{useState,useEffect} from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { HistoricalPaymentCard } from "../HistoricalPaymentCard/HistoricalPaymentCard"; 
const HistoricalPaymentsList = () =>{

    const [historicalList,setHistorical] = useState([]);



    useEffect(() =>{
        Axios.get('http://127.0.0.1:4000/payments/historical')
        .then((response) =>{
            setHistorical(response.data);
        })
        .catch((error) => console.log(error));
    },[]);

    return (
        <React.Fragment>
            <Card style={{ width: '28rem' }}>
                <ListGroup>
                    {historicalList.map((payment)=>{
                        return(
                            <ListGroupItem key={`payment-${payment.id}`}>
                                <HistoricalPaymentCard 
                                    payment={payment}
                                />
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </Card>
        </React.Fragment>
    );
}


export {HistoricalPaymentsList}; 