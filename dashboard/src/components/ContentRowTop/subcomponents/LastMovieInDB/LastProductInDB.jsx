import React, {Component} from "react";
import InfoLastProductInDB from "./subComponent/InfoLastProductInDb";

class LastProductInDB extends Component{
    constructor() {
        super()
        this.state = {
            lastProductId: "",
        }
    }

    componentDidMount() {

        fetch('http://localhost:3001/api/products')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(data => {
                this.setState({ lastProductId: data.products.pop().id })
            })
            .catch(error => console.log(error))

        /*fetch(`http://localhost:3001/api/products/${this.state.lastProductId}`)
            .then(respuesta => {
                return respuesta.json()
            })
            .then(data => {
                this.setState({ lastProductData: data.data })
                console.log(this.state.lastProductId)
            })
            .catch(error => console.log(error))*/
    }

    render(){
        return(
            <div className="col-lg-6 mb-4">
                { this.state.lastProductId ? <InfoLastProductInDB id={this.state.lastProductId}/> : null}
            </div>
        )
    }
}


/*function LastMovieInDB() {
    return(
        <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Último producto creado</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "40rem"}} src={Mandalorian} alt=" Star Wars - Mandalorian " />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
                        <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Detalle del producto</a>
                    </div>
                </div>
            </div>
    )
}*/

export default LastProductInDB;