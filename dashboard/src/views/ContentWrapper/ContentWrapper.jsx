import React from "react";
import ContentRowTop from "../../components/ContentRowTop/ContentRowTop";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/Footer/Footer";
import Table from "../../components/Table/Table";

class ContentWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            arrayData: [],
            columns: {name: "Nombre", short_description: "Descripción"}
        }
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:3001/api/products");
        const data = await response.json();
        this.setState({arrayData: data.products})
    }
    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar -->  */}
                    <TopBar />    
                    {/* <!-- End of Topbar --> */}

                    {/* <!-- Content Row Top -->  */}
                    <ContentRowTop />
                    {/* <!--End Content Row Top--> */}
                </div>
                {/* <!-- End of MainContent -->  */}
                {<Table data={this.state.arrayData} columns={this.state.columns} />}
                {/* <!-- Footer -->   */}
                <Footer />
                {/* <!-- End of Footer --> */}

            </div>
        )
    }
}

export default ContentWrapper;