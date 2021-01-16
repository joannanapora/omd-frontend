import React from 'react';
import Loader from 'react-loader-spinner'


const Spinner = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="#d6702b" />
        </div>);
}

export default Spinner;