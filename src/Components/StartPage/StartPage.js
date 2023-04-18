import React from 'react'
import classes from './Start.module.css'

export default function StartPage() {
  const imagePath = process.env.PUBLIC_URL + './img/greentwitt.png';
  const imagePathUser = process.env.PUBLIC_URL + './img/greenuser.jpg';

  return (
    <>
    <div className={classes.heading}>
      <img src={imagePath} alt="example"style={{ width: '50px', height: 
        '50px' }}/> 
      <h1>NSNS Twitter</h1> 
      {/* NSNS means Natalie Sabana nandini Shervani */}
      </div>
      <div className={classes.user}>
      <span>
      <img src={imagePathUser} alt='user-example' style={{ width: '100px', 
       height: '100px' }}/>
      </span>
      <button className={classes.btnregister} type='button'>Registred Here</button>
      <button className={classes.btnlogin}type='button'>Login Here</button>

      </div>


    
    </>
  )
}
