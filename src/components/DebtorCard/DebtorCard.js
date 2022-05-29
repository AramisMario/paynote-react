import React from "react";
const DebtorCard = ({debtor}) =>{
    return (
        <div className="Main">
            <div className="CardHeader">
                <div>
                    <h6>Nombre: {debtor.name}</h6>
                    <br></br>
                    <h6>Direccion: {debtor.address}</h6>
                </div>
            </div>
        </div>
    );
}


export {DebtorCard};