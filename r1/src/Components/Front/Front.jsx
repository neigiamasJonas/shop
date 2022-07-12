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

    const [cat, setCat] = useState(0);  // paimtas is sort filter
    const [search, setSearch] = useState('')

    const [filter, setFilter] = useState(0);        // allcats <option value=0> SortFilter componente //
   
    const doFilter = cid => {
        setCat(cid);
        setFilter(parseInt(cid));
    }

    // GET PRODUCTS SU FILTER // + search
    useEffect(() => {
        let query;
        if (filter === 0 && !search) {
            query = '';
        } else if (filter) {
            query = '?cat-id=' + filter
        } else if (search) {
            query = '?s=' + search
        }


        axios.get('http://localhost:3006/products' + query, authConfig())
            .then(res => setProducts(res.data.map((p, i) => ({...p, row:i}))));

    }, [filter, search]);   // kai filtras pasikeicia, axios kreipiasi i produktus

    // // Get Products SENAS //
    // useEffect(() => {
    //     axios.get('http://localhost:3006/products', authConfig())
    //     .then(res => setProducts(res.data.map((p, i) => ({...p, row:i}))));
        
    // }, []);
    

    // Get Cats
    useEffect(() => {
        axios.get('http://localhost:3006/cats', authConfig())
            .then(res => setCats(res.data));
    }, []);

    return(
        <FrontContext.Provider value={{
            products,
            setProducts,
            cats,
            setFilter,
            cat,
            setCat,
            doFilter,
            setSearch

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