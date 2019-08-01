import React from 'react';
import './Dropdown.css';

const Dropdown = ({label, value, options, onChange}) => {
    const apa = () => {
        //console.log(options);
    }
    return (
        <div className="Dropdown">
            <label>{label}</label>
            <select onChange={(e) => onChange(label, e.target.value)} value={value}>
                {apa()}
                {options.map(option => <option value={option.replace(" ", "_").toLowerCase()} key={option}>{option}</option>)}
            </select>
        </div>
    );
}

export default Dropdown;