import React from 'react';
import Loader from 'react-loader-spinner'


const Spinner = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="#d6702b" height="100" width="100" />
        </div>);
}



export default Spinner;