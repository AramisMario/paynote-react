import {useState} from "react";

export const useOpenDetails = (initOpen,initIndex) =>{
    const [open,setOpen] = useState(initOpen);
    const [indexOpen, setIndexOpen] = useState(initIndex);

    const handleOpen = (index,loan,isPaying) =>{
        console.log("se activo handleOPen");

        if(isPaying){
            if(loan.payments.length > 0){
                setOpen(true);
            }else{
                setOpen(false);
            }
        }else{
            setOpen(!open);
        }

        // if(open){
        //     setIndexOpen(-1);
        // }else{
            setIndexOpen(index);
        // }
        
    }

    return {
        open,
        indexOpen,
        setOpen,
        setIndexOpen,
        handleOpen
    }
}
