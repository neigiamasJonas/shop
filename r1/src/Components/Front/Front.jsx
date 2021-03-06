import { useState, useEffect } from "react";
import {authConfig} from '../../Functions/auth';
import axios from 'axios';
import Nav from "./Nav";
import FrontContext from "./FrontContext";
import List from "./List"
import SortFilter from "./SortFilter";


function Front() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [products, setProducts] = useState(null);
    const [cats, setCats] = useState(null);

    const [cat, setCat] = useState(0);          // paimtas is sort filter
    const [search, setSearch] = useState('')    // search'as

    const [filter, setFilter] = useState(0);    // allcats <option value=0> SortFilter componente //

    const [addCom, setAddcom] = useState(null);
   
    const doFilter = cid => {
        setCat(cid);
        setFilter(parseInt(cid));
    }


    // // GET PRODUCTS SU FILTER // + search + commentu masyvas
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
            .then(res => {
                const products = new Map();
                res.data.forEach(p => {
                    let comment;
                    if (null === p.com) {
                        comment = null
                    } else {
                        comment = {id: p.com_id, com: p.com};
                    }
                    


                    if (products.has(p.id)) {
                        const pr = products.get(p.id);
                        if (comment) {
                            pr.com.push(comment);
                        }
                        
                    } else {
                        products.set(p.id, {...p});
                        const pr = products.get(p.id);
                        pr.com = [];
                        delete pr.com_id;
                        if (comment) {
                            pr.com.push(comment);
                        }
                    }
                });
                // console.log([...products].map(e => e[1]));
                setProducts([...products].map(e => e[1]).map((p, i) => ({ ...p, row: i })));
            })

    }, [filter, search, lastUpdate]);




    // // GET PRODUCTS SU FILTER // + search
    // useEffect(() => {
    //     let query;
    //     if (filter === 0 && !search) {
    //         query = '';
    //     } else if (filter) {
    //         query = '?cat-id=' + filter
    //     } else if (search) {
    //         query = '?s=' + search
    //     }


    //     axios.get('http://localhost:3006/products' + query, authConfig())
    //         .then(res => setProducts(res.data.map((p, i) => ({...p, row:i}))));

    // }, [filter, search, lastUpdate]);   // kai filtras pasikeicia, axios kreipiasi i produktus, plius lastupdate del comments

    // // // Get Products SENAS //
    // // useEffect(() => {
    // //     axios.get('http://localhost:3006/products', authConfig())
    // //     .then(res => setProducts(res.data.map((p, i) => ({...p, row:i}))));
        
    // // }, []);
    

    // Get Cats
    useEffect(() => {
        axios.get('http://localhost:3006/cats', authConfig())
            .then(res => setCats(res.data));
    }, []);


    // Create comment
    useEffect(() => {
        if (null === addCom) return;
        axios.post('http://localhost:3006/comments', addCom, authConfig())
            .then(_ => {
                setLastUpdate(Date.now());
            })
    }, [addCom]);

    return(
        <FrontContext.Provider value={{
            products,
            setProducts,
            cats,
            setFilter,
            cat,
            setCat,
            doFilter,
            setSearch,
            setAddcom

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