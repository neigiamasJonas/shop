
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import CatsCrud from "./cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./products/Crud";
import { v4 as uuidv4 } from 'uuid';

function Back( {show}) {

    // CAT //
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [cats, setCats] = useState(null);
    const [createCat, setCreateCat] = useState(null);
    const [deleteCat, setDeleteCat] = useState(null);
    const [editCat, setEditCat] = useState(null);
    const [modalCat, setModalCat] = useState(null);

    // PRODUCT //
    const [products, setProducts] = useState(null);
    const [createProduct, setCreateProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [modalProduct, setModalProduct] = useState(null);


    // MSG //
    const [messages, setMessages] = useState([]);

    const showMessage = (m) => {
        const id = uuidv4();
        m.id = id;
        setMessages(msg => [...msg, m])
        setTimeout(() => {
            setMessages(mes => mes.filter(ms => ms.id !== id))
        }, 5000);

    }


    // READ CAT + PRODUCTS //
    useEffect(() => {
        axios.get('http://localhost:3006/admin/cats')
        .then(res => {
            setCats(res.data)
        })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3006/admin/products')
        .then(res => {
            setProducts(res.data)
        });
    }, [lastUpdate]);


    // CREATE CAT + PRODUCTS //
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

    useEffect(() => {
        if (null === createProduct) return;
        axios.post('http://localhost:3006/admin/products', createProduct)
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [createProduct]);



    // DELETE CAT + PRODUCTS //
    useEffect(() => {
        if (null === deleteCat) return;

        axios.delete('http://localhost:3006/admin/cats/' + deleteCat.id)
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deleteCat]);

    useEffect(() => {
        if (null === deleteProduct) return;
        axios.delete('http://localhost:3006/admin/products/' + deleteProduct.id)
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteProduct]);


    // EDIT CAT + PRODUCTS //
    useEffect(() => {
        if (null === editCat) return;
        axios.put('http://localhost:3006/admin/cats/' + editCat.id, editCat)
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editCat]);

    useEffect(() => {
        if (null === editProduct) return;
        axios.put('http://localhost:3006/admin/products/' + editProduct.id, editProduct)
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editProduct]);


    return (
        <BackContext.Provider value={
            {
                setCreateCat,
                cats,
                setDeleteCat,
                messages,
                setEditCat,
                setModalCat,
                modalCat,
                setCreateProduct,
                products,
                showMessage,
                setDeleteProduct,
                setEditProduct,
                setModalProduct,
                modalProduct,
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