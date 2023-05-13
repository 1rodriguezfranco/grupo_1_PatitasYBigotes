import React, { Component } from "react";
import CategoryCard from "./subcomponents/CategoryCard";

class ProductsByCategory extends Component {

    constructor() {
        super()
        this.state = {
            categoriesList: [],
            color: ""
        }
    }

    componentDidMount() {

        fetch('http://localhost:3001/api/products')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(result => {
                this.setState({ categoriesList: result.countByCategory.product_category })
            })
            .catch(error => console.log(error))
    }

    cambiarColor = () => {
        this.setState({ color: "bg-secondary" })
    }

    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800" onMouseOver={ this.cambiarColor }>Productos por categorías</h5>
                    </div>
                    <div className={`card-body ${this.state.color}`}>
                        <div className="row">
                            {
                                Array.isArray(this.state.categoriesList) && this.state.categoriesList.map((category, i) => <CategoryCard key={ category.name + i } name={ category.name } quantity={ category.quantity}/>)
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsByCategory;