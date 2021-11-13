import React from 'react';
import './css/loading.scss';

const Loading = () => {
    return (
        <div className="loading-holeder">
            <i className="fa fa-spinner fa-spin"></i>
            <span>Loading...</span>
        </div>
    )
}

export default Loading;
