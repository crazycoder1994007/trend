import React from "react";
import "./Dropdown.css";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="Dropdown">
      <select onChange={(e) => onChange(label, e.target.value)} value={value}>
        {options.map((option) => (
          <option value={option.replace(" ", "_").toLowerCase()} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
