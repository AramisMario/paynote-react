import {useState,useRef} from "react";

const usePopover = ({defaultShow,defaultTarget}) => {
    const [show, setShow] = useState(defaultShow);
    const target = useRef(defaultTarget);

    const verifyPayments = (loan) =>{
        if( loan.payments.length === 0){
            setShow(true);
            setTimeout(() => {
                setShow(false);
            },3000);
        }else{
            setShow(false);
        }
    }

    return {
        show,
        target,
        verifyPayments
    }
}

export {usePopover};