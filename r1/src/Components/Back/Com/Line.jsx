import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

    const { setDeleteCom } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteCom(line);
    }


    return (
        <li className="list-group-item">
            <div className="item">
                <h5>{line.title}</h5>
                <div className="content">
                    <p>{line.com}</p>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;