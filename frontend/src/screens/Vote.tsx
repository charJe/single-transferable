import React from 'react';
import {useParams} from 'react-router-dom';

export const Vote: React.FC = () => {
    let { accessor } = useParams();
    return (
        <div>
            accessor: {accessor}
        </div>
    );
}

