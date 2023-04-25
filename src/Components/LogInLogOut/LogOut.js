import React from 'react'
import './LogOut.css';

export default function LogOut ()
{
  const imagePath = process.env.PUBLIC_URL + './img/bluetwitt.png';
  return (
    <div className="div1">
      <div className='div2'>
        <div className='div3'>
          <img className='logout-image' src={imagePath} alt="example" style={{
            width: '50px', height:
              '50px'
          }} />
          <h3>Log out of Twitter?</h3>
          <button type='logout'>Log out</button><br />
          <button type='cancel'>Cancel</button>
        </div>
      </div>

    </div>
  );
}


