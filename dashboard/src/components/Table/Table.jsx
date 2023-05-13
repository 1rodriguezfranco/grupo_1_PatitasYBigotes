import React from "react";
import TBody from "./subcomponents/TBody";

function Table(props) {
    const columns = Object.keys(props.columns);

    return(
        <table className="table table-striped">
                <thead>
                    <tr>
                        { columns.map((col, i) =>  <th key={col + i}>{props.columns[col]}</th> )}
                    </tr>
                </thead>

                <TBody data={props.data} columns={columns} />
                
            </table>
    )
}

export default Table;