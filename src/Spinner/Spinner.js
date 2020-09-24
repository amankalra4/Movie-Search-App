import React from 'react';
import './Spinner.css'

const Spinner = () => {
    let bgColor = '';
    if(document.body.style.backgroundColor === 'rgb(25, 25, 27)') {
        bgColor = 'white'
    }
    else {
        bgColor = 'black'
    }
    return <div className = 'Loader' style = {{color: bgColor}}>Loading...</div>
};

export default Spinner;