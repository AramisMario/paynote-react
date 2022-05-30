import { useState } from "react";

const useDebtors = () => {

    const [debtors,setDebtors] = useState([]);


    return(
        debtors,
        setDebtors
    );
}