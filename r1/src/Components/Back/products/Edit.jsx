import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/base64'

function Edit() {

    const { modalProduct, setEditProduct, setModalProduct, cats, setDeletePhoto } = useContext(BackContext);


    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [cat, setCat] = useState('0');
    const [lu, setLu] = useState('');

    // photo //
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // tylim
        })
    }

    const handleDeletePhoto = () => {
        setDeletePhoto({id: modalProduct.id})
        // setPhotoPrint(null);
        setModalProduct(p => ({...p, photo: null}))
    }


    // date //
    const setDateFormat = d => {
        //yyyy-MM-ddThh:mm
        const date = new Date(Date.parse(d));
        const y = date.getFullYear();
        const m = ('' + (date.getMonth() + 1)).padStart(2, '0');
        const day = ('' + date.getDate()).padStart(2, '0');
        const h = ('' + date.getHours()).padStart(2, '0');
        const min = ('' + date.getMinutes()).padStart(2, '0');
        const out = y + '-' + m + '-' + day + 'T' + h + ':' + min;
        return out;
    }

    useEffect(() => {
        if (null === modalProduct) {
            return;
        }
        setTitle(modalProduct.title);
        setPrice(modalProduct.price);
        setLu(setDateFormat(modalProduct.lu));
        setInStock(modalProduct.in_stock ? true : false);
        setCat(cats.filter(c => c.title === modalProduct.cat)[0].id);
        setPhotoPrint(modalProduct.photo)
    }, [modalProduct, cats]);

    const handleEdit = () => {
        const data = {
            title,
            id: modalProduct.id,
            in_stock: inStock ? 1 : 0,
            price: parseFloat(price),
            cat: parseInt(cat),
            lu: lu,
            photo: photoPrint
        };
        setEditProduct(data);
        setModalProduct(null);
    }

    if (null === modalProduct) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Product Changer</h5>
                        <button type="button" className="close" onClick={() => setModalProduct(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            <small className="form-text text-muted">Enter cat title here.</small>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
                            <small className="form-text text-muted">Enter price.</small>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="datetime-local" className="form-control" onChange={e => setLu(e.target.value)} value={lu} />
                            <small className="form-text text-muted">Enter Date.</small>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="in--stock--modal" checked={inStock} onChange={() => setInStock(i => !i)} />
                            <label className="form-check-label" htmlFor="in--stock--modal">Check me out</label>
                        </div>
                        <div className="form-group">
                            <label>Categories</label>
                            <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
                                <option value="0">Please, select your Cat</option>
                                {
                                    cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                                }
                            </select>
                            <small className="form-text text-muted">Select category here.</small>
                        </div>
                        <div className="form-group">
                            <label>Photo</label>
                            <br/>
                            <input type="file" ref={fileInput} onChange={doPhoto}/>
                            <small className="form-text text-muted">Upload photo</small>
                        </div>
                        {
                            photoPrint ? <div className='photo-bin'><img src={photoPrint} alt='chosen img'></img></div> : null
                        }
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalProduct(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove photo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;