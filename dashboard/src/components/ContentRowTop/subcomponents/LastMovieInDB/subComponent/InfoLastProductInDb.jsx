import React, {Component} from "react";
import Last from "./Last";

class InfoLastProductInDB extends Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            lastProductData: [],
            lastProductImage: ""
        }
    }

    componentDidMount() {

        fetch(`http://localhost:3001/api/products/${this.state.id}`)
            .then(respuesta => {
                return respuesta.json()
            })
            .then(data => {
                console.log(data)
                this.setState({ lastProductData: data.data })
                this.setState({ lastProductImage: data.detail.url })
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto creado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "15rem"}} src={this.state.lastProductImage} />
                    </div>
                    <p>{this.state.lastProductData.name}</p>
                    <p>{this.state.lastProductData.short_description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Detalle del producto</a>
                </div>
            </div>
        )
    }

}

/*

<div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto creado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "40rem"}} src={this.state.lastProductData.detail.url} alt=" Star Wars - Mandalorian " />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Detalle del producto</a>
                </div>

<div className="card shadow mb-4">
                    <Last product={this.state.lastProductData} />
            </div>

*/

export default InfoLastProductInDB;