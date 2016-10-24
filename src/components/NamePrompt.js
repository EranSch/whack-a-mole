import React, { PropTypes } from 'react';

let inputRef;

const NamePrompt = ({ onSubmit }) => (
  <div>
    <input type="text" ref={domRef => { inputRef = domRef; }} />
    <button type="button" onClick={() => onSubmit(inputRef.value)}>
      Save
    </button>
  </div>
);

NamePrompt.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NamePrompt;
