import React from 'react';

import '../../styles/Input.css';

const Input = props => {
  return (
    <div className="input-container">
      <span className="input-label">{props.label}</span>
      {props.type !== 'textarea' && <input type={props.type} className="input-text" />}
      {props.type === 'textarea' && <textarea className="input-text" />}
    </div>
  );
};

export default Input;
