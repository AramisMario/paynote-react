import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle);
const AddIcon = (props) => {
    return (
        <div className="AddLoanIcon">
            <FontAwesomeIcon icon={faPlusCircle} onClick={() => props.setLoanModalShow(true)} color="red" size="4x"/>
        </div>
    );
}
export {AddIcon}