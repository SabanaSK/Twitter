import React, {useEffect, useState} from 'react';
import './ProfileMenu.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LogoutPopup from '../LogoutPopup/LogoutPopup';

export const ProfileMenu = ({ loggedUserId }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/profile/${loggedUserId}`);
                setProfileData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (loggedUserId) {
            fetchProfile();
        }
    }, [loggedUserId]);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        navigate("/");
    };

    const chanelPopup = () => {
        setShowPopup(false);
        navigate("/home");
    };


    const avatarSrc =
        profileData && profileData.avatarImageUrl && profileData.avatarImageUrl !== ""
            ? profileData.avatarImageUrl
            : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";


    return (
        <>
            <div className='profile-menu nav-menu-link' onClick={openPopup}>
                <img className="profile-menu-avatar" src={avatarSrc} alt="profile menu avatar" />
                <div className="profile-menu-info">
                    {profileData && (
                        <>
                            <span className="profile-menu-name">
                                {profileData.username}
                            </span>
                            <span className="profile-menu-username">
                                {profileData.nickname}
                            </span>
                        </>
                    )}
                </div>
                <svg height="19" width="19" viewBox="0 96 960 960" fill='white'>
                    <path d="M207.858 624Q188 624 174 609.858q-14-14.141-14-34Q160 556 174.142 542q14.141-14 34-14Q228 528 242 542.142q14 14.141 14 34Q256 596 241.858 610q-14.141 14-34 14Zm272 0Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm272 0Q732 624 718 609.858q-14-14.141-14-34Q704 556 718.142 542q14.141-14 34-14Q772 528 786 542.142q14 14.141 14 34Q800 596 785.858 610q-14.141 14-34 14Z" />

                </svg>
            </div>
            <LogoutPopup showPopup={showPopup} onClose={closePopup} onChanel={chanelPopup} />
        </>
    )
}







