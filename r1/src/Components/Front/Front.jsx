import { useState, useEffect } from "react";
import {authConfig} from '../../Functions/auth';
import axios from 'axios';
import Nav from "./Nav";
import FrontContext from "./FrontContext";
import List from "./List"
import SortFilter from "./SortFilter";


function Front() {

    const [products, setProducts] = useState(null);
    const [cats, setCats] = useState(null);
   

    useEffect(() => {
        axios.get('http://localhost:3006/products', authConfig())
        .then(res => setProducts(res.data.map((p, i) => ({...p, row:i}))));
        
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3006/cats', authConfig())
            .then(res => setCats(res.data));
    }, []);

    return(
        <FrontContext.Provider value={{
            products,
            setProducts,
            cats

        }}>
            <Nav/>
            <div>
                <h1>Products</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <SortFilter/>
                        
                    </div>
                    <div className="col-12">
                        <List/>
                    </div>
                </div>
            </div>
            
        </FrontContext.Provider>
    )
}

export default Front;