import React from 'react';

const PrefixedInput = ({ prefix, ...rest }) => {
  return (
    <div className="input-prefix">
      <span className="prefix">{prefix}</span>
      <input {...rest} />
    </div>
  );
};

export default PrefixedInput;
