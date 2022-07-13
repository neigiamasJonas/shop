
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import CatsCrud from "./cats/Crud";
import ComCrud from "./Com/Crud";
import Nav from "./Nav";
import ProductsCrud from "./products/Crud";
import { v4 as uuidv4 } from 'uuid';
import {authConfig} from '../../Functions/auth';

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

    // Photo //
    const [deletePhoto, setDeletePhoto] = useState(null);


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

    // comments //
    const [comments, setComments] = useState(null);
    const [deleteCom, setDeleteCom] = useState(null);


    // READ CAT + PRODUCTS //
    useEffect(() => {
        axios.get('http://localhost:3006/admin/cats', authConfig())
        .then(res => {
            setCats(res.data)
        })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3006/admin/products', authConfig())
        .then(res => {
            setProducts(res.data)
        });
    }, [lastUpdate]);


    // CREATE CAT + PRODUCTS //
    useEffect(() => {
        if (null === createCat) return;

        axios.post('http://localhost:3006/admin/cats', createCat, authConfig())
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
        axios.post('http://localhost:3006/admin/products', createProduct, authConfig())
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

        axios.delete('http://localhost:3006/admin/cats/' + deleteCat.id, authConfig())
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
        axios.delete('http://localhost:3006/admin/products/' + deleteProduct.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteProduct]);

    // delete photo //
    useEffect(() => {
        if (null === deletePhoto) return;

        axios.delete('http://localhost:3006/admin/photos/' + deletePhoto.id, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            // setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deletePhoto]);


    // EDIT CAT + PRODUCTS //
    useEffect(() => {
        if (null === editCat) return;
        axios.put('http://localhost:3006/admin/cats/' + editCat.id, editCat, authConfig())
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
        axios.put('http://localhost:3006/admin/products/' + editProduct.id, editProduct, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editProduct]);



    // read comments // 
    useEffect(() => {
        axios.get('http://localhost:3006/admin/comments', authConfig())
        .then(res => {
            setComments(res.data)
        })
    }, [lastUpdate]);

    // delete comment //
    useEffect(() => {
        if (null === deleteCom) return;

        axios.delete('http://localhost:3006/admin/comments/' + deleteCom.id, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deleteCom]);


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
                setDeletePhoto,
                setDeleteCom,
                comments
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

                : show === 'com' ? <ComCrud/>
                    
                : show === 'products' ? <ProductsCrud/>
                    
                : null
            }
        </BackContext.Provider>

    )

}

export default Back;