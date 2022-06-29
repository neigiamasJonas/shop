
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import CatsCrud from "./cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./products/Crud";

function Back( {show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [createCat, setCreateCat] = useState(null);

    const showMessage = () => {

    }


    // CREATE CAT //
    useEffect(() => {
        if (null === createCat) return;

        axios.post('http://localhost:3006/admin/cats', createCat)
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [createCat]);


    return (
        <BackContext.Provider value={
            {
                setCreateCat
            }
            }>
            {
                show === 'admin' ? 
                    // ADMIN //
                    <>
                        <Nav/>
                            <h1>ADMIN</h1>
                    </>
                : show === 'cats' ? <CatsCrud/>
                    
                : show === 'products' ? <ProductsCrud/>
                    
                : null
            }
        </BackContext.Provider>

    )

}

export default Back;