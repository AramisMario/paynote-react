import { useState } from "react";
import Axios from "axios";
import {useOpenDetails} from "./useOpenDetails";

export const useLoanList = (initLoanList) =>{
    const [loanList, setLoanList] = useState(initLoanList);
    const [isPaying,setIsPaying] = useState(false);
    const {
        open,
        indexOpen,
        setOpen,
        setIndexOpen,
        handleOpen
    } = useOpenDetails(false,-1);

    const addPayment = (index,loan) => {
        console.log("index: ",index);
        console.log("loan: ",loan);
        setIsPaying(true);
        let newLoanList = [...loanList];
        if(newLoanList[index]["payments"].length > 0 && newLoanList[index]["payments"][0].loanId){
            newLoanList[index]["payments"].unshift({loanId:null,amount:0,payType:''});
            // console.log(newLoanList);
            setLoanList(newLoanList);
        }else if(newLoanList[index]["payments"].length === 0){
            console.log("aQUI");
            newLoanList[index]["payments"].push({loanId:null,amount:0,payType:''});
            setLoanList(newLoanList);
        }
        handleOpen(index,loan,true);
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
        isPaying,
        handleOpen,
        indexOpen,
        open
    };
}
