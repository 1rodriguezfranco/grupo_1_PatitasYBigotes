import React, { Component } from "react";
import TotalsCard from "./subComponent/TotalsCard";

class Card extends Component{
    constructor() {
        super()
        this.state = {
            totalProducts: "",
            totalCategories: "",
            totalUsers: ""
        }
    }

    componentDidMount() {

        fetch('http://localhost:3001/api/products')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(result => {
                this.setState({ totalProducts: result.count.quantity_of_products })
                this.setState({ totalCategories: result.countByCategory.product_category.length })
            })
            .catch(error => console.log(error))

        fetch('http://localhost:3001/api/users')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(result => {
                this.setState({ totalUsers: result.count.total })           
            })
            .catch(error => console.log(error))
            
    }
    render(){
        return (
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className={`card border-left-danger shadow h-100 py-2`}>
                    <div className="card-body">
                         <TotalsCard key={ this.state.totalProducts + 1 } title="Productos" quantity={this.state.totalProducts}/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className={`card border-left-success shadow h-100 py-2`}>
                    <div className="card-body">
                         <TotalsCard key={ this.state.totalCategories + 1 } title="Categorías" quantity={this.state.totalCategories}/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className={`card border-left-warning shadow h-100 py-2`}>
                    <div className="card-body">
                         <TotalsCard key={ this.state.totalUsers + 1 } title="Usuarios" quantity={this.state.totalUsers}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Card;