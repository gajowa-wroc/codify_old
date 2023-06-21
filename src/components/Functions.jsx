import React from 'react';
import { useSelector } from 'react-redux';

const Functions = () => {
  const output = useSelector(state => state.output);
        if (output==="send"){
            console.log("send")
        }

  // Use the output object in your component

  return (
    <div></div>
  );
};

export default Functions;