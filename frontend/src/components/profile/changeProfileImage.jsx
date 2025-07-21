import React, { useRef, useState } from "react";
import ProfileImage from '@/components/profile/profileImage';

const changeProfileImage = () => {



    const [changedImageSrc, setChangedImageSrc] = useState('');

    return(
        <div className="change-profile-image">
            <ProfileImage 
                size = '117'
                src = {changedImageSrc}
            />
        </div>
    );
}

export default changeProfileImage;