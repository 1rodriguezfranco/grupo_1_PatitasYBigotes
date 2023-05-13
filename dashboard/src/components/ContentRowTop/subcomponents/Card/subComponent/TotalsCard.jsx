import React from "react";

function TotalsCard(props) {
    return (
        <div className="row no-gutters align-items-center">
            <div className="col mr-2">
                <div className={`text-xs font-weight-bold text-black text-uppercase mb-1`}>Total de {props.title}</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{ props.quantity }</div>
            </div>
        </div>
    )
}

export default TotalsCard;