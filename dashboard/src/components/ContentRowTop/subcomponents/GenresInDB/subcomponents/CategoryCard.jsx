import React from "react";

function CategoryCard(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div> Categoría: {props.name}</div>
                    <div> Cantidad: {props.quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard;