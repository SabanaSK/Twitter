import classes from './MyProfile.module.css'
import { Link, useParams } from 'react-router-dom';


// user exampel img
const imagePathUser = process.env.PUBLIC_URL + '../img/greenuser.jpg';
 
/*
To do
1. Link Following and Followers to eatch side.
2. Function to get the users information to show up insted of hard coding. 
3. Add the list of "my" twwets at the end of the page.
*/


const ProfilePage = () => {

    /*const users =  //get the users
    const {id} = useParams()
    const thisUser = users.find(item => {
      return String(item.id) === id;
    })*/
    // Add {thisUser.name} and others insted of hardcoding
    
    
    return (
        <div className={classes.userProfile} >
            
            <img className={classes.impProfile} src={imagePathUser} alt='user-example'/>
            <h2 className={classes.name}> John Doe </h2>

            <div className={classes.container}>
                <h5 className={classes.nick}> @John123 </h5>
                <Link className={classes.btnedit} to={`/edit`}> Edit </Link>
            </div>

            <p className={classes.about}> Iam a student at Jensen  </p>

            <ul className={classes.list}>
                <div className={classes.containerTwo}>
                    <li> Jensen </li>
                    <li> Gothenburg </li>
                    <li> www.mypage.com </li>
                    <li> 08-11-2021 </li>
                </div>
                <div className={classes.containerTwo}>
                    <li> <Link  to={`/`}> Following </Link> </li>
                    <li> <Link  to={`/`}> Followers </Link></li>
                </div>
            </ul>
            
        </div>
    )
}

export default ProfilePage