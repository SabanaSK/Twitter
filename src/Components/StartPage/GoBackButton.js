import React from 'react';
import { Link } from 'react-router-dom';



function GoBackButton() {
  return (
    <Link to= "/">
      <button>Go back</button>
    </Link>
  );
}

export default GoBackButton;