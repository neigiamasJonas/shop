
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import CatsCrud from "./cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./products/Crud";
import { v4 as uuidv4 } from 'uuid';

function Back( {show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [cats, setCats] = useState(null);
    const [createCat, setCreateCat] = useState(null);
    const [deleteCat, setDeleteCat] = useState(null);
    const [editCat, setEditCat] = useState(null);
    const [modalCat, setModalCat] = useState(null);

    // msg //
    const [messages, setMessages] = useState([]);

    const showMessage = (m) => {
        const id = uuidv4();
        m.id = id;
        setMessages(msg => [...msg, m])
        setTimeout(() => {
            setMessages(mes => mes.filter(ms => ms.id !== id))
        }, 5000);

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

    // READ CAT //
    useEffect(() => {
        axios.get('http://localhost:3006/admin/cats')
        .then(res => {
            setCats(res.data)
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [lastUpdate]);

    // DELETE CAT //
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

        // EDIT CAT //
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


    return (
        <BackContext.Provider value={
            {
                setCreateCat,
                setDeleteCat,
                cats,
                messages,
                setEditCat,
                setModalCat,
                modalCat

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