import React from 'react';


const selectBlock =({id, text, placeholder, items}) =>{
    let options;
    items.map(function(x){
    options += `<option>${x}</option>`
    })
    return (
        <div className='form-element'>
            <label>{text}</label>
            <select placeholder={placeholder}>
                {options}
            </select>
        </div>
    )
}

export default selectBlock;