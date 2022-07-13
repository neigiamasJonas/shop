

import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

    const {comments} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Categories</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    comments ? comments.map(com => <Line key={com.id} line={com}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;