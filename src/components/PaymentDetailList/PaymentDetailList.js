import React from "react";
import {PaymentCard} from "../PaymentCard/PaymentCard";
const PaymentDetailList = (props) =>{
    const {payments,isPaying,loanId,interest} = props; 
    return (
        <div className='PaymentDetailList'>
            {payments.map((payment,index) => {
                return (<PaymentCard 
                    key={`payment-${payment.id}`} 
                    payment={payment} 
                    isPaying={isPaying} 
                    index={index}
                    loanId={loanId}
                    interest={interest}
                    />
                    )
            })
            }            
        </div>
    );
}


export {PaymentDetailList};