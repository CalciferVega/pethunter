import React from 'react';

const button =({id, text, style}) =>{
    return (
        <button className={style} key={id}>text</button>
    )
}

export default button;