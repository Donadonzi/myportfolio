import React from 'react';
// import usePromiseTracker from 'react-promise-tracker';
import  { CircleLoader } from 'react-spinners';


const Loader = (props) => {
    // const promiseInProgress  = usePromiseTracker();
        return (
            // promiseInProgress && (
                <div className="spinner">
                     <CircleLoader size={90} color={'#08BE9E'} />
                     <p>Waiting for the location...</p>
                </div>
            // )    
        );
    };



export default Loader;

