import { React, useState } from 'react'
import './ProfileMenu.css';
import { useNavigate } from "react-router-dom";
import LogoutPopup from '../LogoutPopup/LogoutPopup';

export const ProfileMenu = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        navigate("/");
        console.log("close");
    };

    return (
        <>
            <div className='profile-menu nav-menu-link' onClick={openPopup}>
                <img className="profile-menu-avatar" src="https://pbs.twimg.com/media/FuLgsU5WcAIEBSe?format=jpg&name=large" alt="profile menu avatar" />
                <div className="profile-menu-info">
                    <span className="profile-menu-name">
                        Shiervani
                    </span>
                    <span className="profile-menu-username">
                        @shiervani128
                    </span>
                </div>

                <svg height="19" width="19" viewBox="0 96 960 960" fill='white'>
                    <path d="M207.858 624Q188 624 174 609.858q-14-14.141-14-34Q160 556 174.142 542q14.141-14 34-14Q228 528 242 542.142q14 14.141 14 34Q256 596 241.858 610q-14.141 14-34 14Zm272 0Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm272 0Q732 624 718 609.858q-14-14.141-14-34Q704 556 718.142 542q14.141-14 34-14Q772 528 786 542.142q14 14.141 14 34Q800 596 785.858 610q-14.141 14-34 14Z" />
                </svg>
            </div>
            <LogoutPopup showPopup={showPopup} onClose={closePopup} />
        </>
    )
}
