import classes from './Edit.module.css'
import { Link, useParams } from 'react-router-dom';

const imagePathUser = process.env.PUBLIC_URL + '../img/greenuser.jpg';

const Edit = () => { 

    
    return (
        <div>
     
    
      <form onSubmit={""} className={classes.userProfile}>
      
      <img className={classes.impProfile} src={imagePathUser} alt='user-example'/>
          <label>Name </label>
          <input   type="text" id="name" defaultValue={""} />
          <label>Nickname </label>
          <input  type="text" id="nick" defaultValue={""}/>
          <label>About </label>
          <input className={classes.about} type="text" id="ages" defaultValue={""}/>
          <label> Employment </label>
          <input  type="text" id="sex" defaultValue={""}/>
          <label> City </label>
          <input  type="text" id="bio" defaultValue ={""}/>
          <label> My page </label>
          <input  type="text" id="bio" defaultValue ={""}/>
          
        <button className={classes.btnSave}type="submit">save</button>
        <Link className={classes.btnCancel} to={`/profile`}> Cancel </Link>
        
      </form>
    </div>
      
      )

};

export default Edit