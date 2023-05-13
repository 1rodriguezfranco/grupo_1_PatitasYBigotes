import React from "react";
import Card from "./subcomponents/Card/Card";
import LastProductInDB from "./subcomponents/LastMovieInDB/LastProductInDB";
import ProductsByCategory from "./subcomponents/GenresInDB/ProductsByCategory";

function ContentRowTop(){

    return(
        <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>
    
        {/* <!-- Content Row Movies--> */}
        
            <Card  />

        {/* <!-- End movies in Data Base --> */}
        

        {/* <!-- Content Row Last Movie in Data Base --> */}
        <div className="row">
            {/* <!-- Last Movie in DB -->  */}
            <LastProductInDB />
            {/* <!-- End content row last movie in Data Base -->  */}
            <ProductsByCategory />
            {/* <!-- Genres in DB --> */}
            
        </div>
    </div>
    )
}

export default ContentRowTop;