// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUser, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
// import classes from './OtherUsersProfile.module.css';
// import { Link } from 'react-router-dom';


// const OtherUserProfilePage = ({ match }) =>
// {
//   const [ userData, setUserData ] = useState({});
//   const [ isLoading, setIsLoading ] = useState(true);
//   const imgPath = process.env.PUBLIC_URL + 'img/twitt.jpg';
//   const imgPath1 = process.env.PUBLIC_URL + 'img/bluetwitt.png';


//   useEffect(() =>
//   {
//     const fetchData = async () =>
//     {
//       try
//       {
//         const response = await axios.get(`http://localhost:3001/users/${ match.params.id }`);
//         setUserData(response.data);
//         setIsLoading(false);
//       } catch (error)
//       {
//         console.log(error.message);
//       }
//     };
//     fetchData();
//   }, [ match ]);


//   return (
//     <>
//       <div className={classes.imgtwitt}>
//         <img src={imgPath1} alt="imagetwitt" />
//       </div>
//       <div className={classes.container}>

//         <div className={classes.sidebar}>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/profile">Profile</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="userprofileform">


//           <div className={classes.profilePage}>

//             <div className={classes.backgroundimg}>
//               <div className="img-container">

//                 <div className={classes.profilepicture}>
//                   <img src={imgPath} alt="Image description" />
//                 </div>
//                 <div className={classes.profileInfo}>
//                   <div className={classes.infoItem}>
//                     <FaUser className={classes.infoIcon} />
//                     <span className={classes.infoText}>{userData.username}John</span>
//                   </div>
//                   <div className={classes.infoItem}>
//                     <FaUser className={classes.infoIcon} />
//                     <span className={classes.infoText}>{userData.nickname}@John1811</span>
//                   </div>
//                   <div className={classes.infoItem}>
//                     <FaMapMarkerAlt className={classes.infoIcon} />
//                     <span className={classes.infoText}>{userData.hometown}Mumbai</span>
//                   </div>
//                   <div className={classes.infoItem}>
//                     <FaUsers className={classes.infoIcon} />
//                     <span className={classes.infoText}>{userData.followers} 13.8k followers</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="button-container">
//               <button>Follow</button>
//             </div>
//           </div>
//           <div className={classes.rightsidebar}>
//             <input
//               type="search-box"
//               placeholder="Search on Twitter" />


//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OtherUserProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

import classes from './OtherUsersProfile.module.css';

const OtherUserProfilePage = ({ match }) =>
{
  const [ userData, setUserData ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const imgPath = process.env.PUBLIC_URL + 'img/twitt.jpg';
  const imgPath1 = process.env.PUBLIC_URL + 'img/bluetwitt.png';

  useEffect(() =>
  {
    const fetchUserData = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:3001/users/${ match.params.id }`);
        setUserData(response.data);
        setIsLoading(false);
      } catch (error)
      {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [ match.params.id ]);

  return (
    <>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : (
        <div className={classes.container}>
          <div className={classes.imgtwitt}>
            <img src={imgPath1} alt="twitt" />
          </div>

          <div className={classes.sidebar}>
            <ul>
              <li>Home</li>
              <li>Profile</li>
            </ul>
          </div>

          <div className="userprofileform">
            <div className={classes.profilePage}>
              <div className={classes.backgroundimg}>
                <div className="img-container">
                  <div className={classes.profilepicture}>
                    <img src={imgPath} alt="description" />
                  </div>
                  <div className={classes.profileInfo}>
                    <div className={classes.infoItem}>
                      <FaUser className={classes.infoIcon} />
                      <span className={classes.infoText}>{userData.username}</span>
                    </div>
                    <div className={classes.infoItem}>
                      <FaUser className={classes.infoIcon} />
                      <span className={classes.infoText}>{userData.nickname}</span>
                    </div>
                    <div className={classes.infoItem}>
                      <FaMapMarkerAlt className={classes.infoIcon} />
                      <span className={classes.infoText}>{userData.hometown}</span>
                    </div>
                    <div className={classes.infoItem}>
                      <FaUsers className={classes.infoIcon} />
                      <span className={classes.infoText}>{userData.followers} followers</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button>Follow</button>
              </div>
            </div>

            <div className={classes.rightsidebar}>
              <input
                type="search-box"
                placeholder="Search on Twitter"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtherUserProfilePage;



