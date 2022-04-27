import React from 'react';

const inputBlock =({id, type, text, placeholder, style}) =>{
    return (
        <div className='form-element'>
            <label>{text}</label>
            <input type={type} className={style} key={id} placeholder={placeholder} />
        </div>
    )
}

export default inputBlock;