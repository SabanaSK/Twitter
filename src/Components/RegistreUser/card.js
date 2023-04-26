import React from 'react';

import Classes from './card.module.css';

const Card = (props) =>
{
  return (
    <div className={`${ Classes.card } ${ props.className }`}>{props.children}</div>
  );
};

export default Card;
