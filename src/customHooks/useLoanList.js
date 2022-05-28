import { useState, useReducer } from "react";
import Axios from "axios";
import {openIndexReducer} from "../reducers/OpenIndexReducer";
export const useLoanList = (initLoanList) =>{
    const [loanList, setLoanList] = useState(initLoanList);
    const [openManager,openManagerDispatcher] = useReducer(openIndexReducer,{open:false,indexOpen:-1,isPaying:false,indexPaying:-1});

    const addPayment = (index) => {
        let newLoanList = [...loanList];
        if(newLoanList[index]["payments"].length > 0 && newLoanList[index]["payments"][0].loanId){
            newLoanList[index]["payments"].unshift({loanId:null,amount:0,payType:''});
            setLoanList(newLoanList);
        }else if(newLoanList[index]["payments"].length === 0){
            console.log("aQUI");
            newLoanList[index]["payments"].push({loanId:null,amount:0,payType:''});
            setLoanList(newLoanList);
        }
        openManagerDispatcher({type:'OPEN_TO_PAY',indexOpen:index});
    }

    const cancelPayment = (index) =>{
        if(!loanList[index]["payments"][0].loanId){
            let newLoanList = [...loanList];
            newLoanList[index]["payments"].shift();
            setLoanList(newLoanList);
            openManagerDispatcher({type:'CANCEL_OR_FINISH_PAY'});
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
            openManagerDispatcher({type:'CANCEL_OR_FINISH_PAY'});
        })
        .catch((error) => {
            setLoanList([]);
            console.log(error);
       });
    }

    return {
        loanList,
        setLoanList,
        addPayment,
        cancelPayment,
        createPayment,
        openManagerDispatcher,
        openManager
    };
}
