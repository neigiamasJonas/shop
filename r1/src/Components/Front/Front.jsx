import Nav from "./Nav";
// import List from "./List";

function Front() {

    return(
        <>
            <Nav/>
            <div>
                <h1>Products</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        
                    </div>
                    <div className="col-8">
                        {/* <List/> */}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Front;