import React from 'react';

import '../../styles/Input.css';

const Input = props => {
  if (props.type === 'textarea' || props.type === 'text') {
    return (
      <div className="input-container">
        {props.label && <span className="input-label">{props.label}</span>}
        {props.type === 'text' && <input type={props.type} className="input-text" value={props.value} />}
        {props.type === 'textarea' && <textarea className="input-text" />}
        {props.type === 'number' && <input type={props.type} className="input-text" value={props.value} min={props.min} max={props.max} />}
      </div>
    );
  } else if (props.type === 'checkbox') {
    return (
      <div className="input.container">
        <input type="checkbox" id={props.label} />
        <label for={props.label}>{props.label}</label>
      </div>
    );
  }
};

export default Input;
