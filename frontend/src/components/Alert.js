import React from 'react';



const Alert = (alertText) => { 
    const text = alertText
    return <>
        <div style={{backgroundColor: 'red'}}>
            <h4>{text}</h4>
        </div>
    </>
}

export default Alert