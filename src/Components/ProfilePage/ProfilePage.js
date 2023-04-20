import classes from './Profile.module.css'
import { Link, useParams } from 'react-router-dom';


// user exampel img
const imagePathUser = process.env.PUBLIC_URL + '../img/greenuser.jpg';


const ProfilePage = () => {

    /*const users =  //get the users
    const {id} = useParams()
    const thisUser = users.find(item => {
      return String(item.id) === id;
    })*/
    
    
    return (
        <div className={classes.userProfile} >
            
            <img className={classes.impProfile} src={imagePathUser} alt='user-example'/>
            <h5 className={classes.name}> Johnny Doe </h5>

            <div className={classes.container}>
                <h5 className={classes.nick}> @John123 </h5>
                <button className={classes.btnfollow} > Follow </button> 
            </div>

            <p className={classes.about}> Iam a student at Jensen  </p>

            <ul className={classes.list}>
                <div className={classes.containerTwo}>
                    <li> Jensen </li>
                    <li> Gothenburg </li>
                </div>
                <div className={classes.containerTwo}>
                    <li> www.mypage.com </li>
                    <li> 08-11-2021 </li>
                </div>
                <div className={classes.containerTwo}>
                    <li> 10k followers </li>
                    <li> 6k following</li>
                </div>
            </ul>
            
            <p className={classes.friends}> I follow</p>
            <ul className={classes.friends}>   
            <li> Sabana </li>
            <li> Nandini</li>
            <li> Shervani</li>
            </ul>

            <ul className={classes.friends}>   
            <li> Tweets </li>
            <li> Tweets </li>
            <li> Tweets </li>
            </ul>
        </div>
    )
}

export default ProfilePage