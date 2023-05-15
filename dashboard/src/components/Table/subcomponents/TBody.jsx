import React from "react";

function TBody(props) {

    return (

        <tbody>
            {
                props.data.map((row, j) => (

                    <tr key={row.name + j}>
                        {props.columns.map((col) => (

                            <td>{col == "genre" ? row[col]?.name : row[col]}</td>
                        ))}
                    </tr>
                ))
            }


        </tbody>
    )
}

export default TBody;