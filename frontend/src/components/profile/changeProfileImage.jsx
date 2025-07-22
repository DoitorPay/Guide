import React, { useRef, useState } from "react";
import ProfileImage from '@/components/profile/profileImage';
import MoreOption from "../popupModal/moreOption";

const ChangeProfileImage = () => {
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false); // MoreOption 열림/닫힘 상태

    const defaultAvatar = '/images/default-avatar.png';

    const fileInputRef = useRef(null);

    const handleOptionSelect = (optionValue) => {
        if (optionValue === "setDefault") {
            setChangedImageSrc(defaultAvatar);
        } else if (optionValue === "selectAlbum") {
            fileInputRef.current.click();
        }
        setIsMoreOptionOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setChangedImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [changedImageSrc, setChangedImageSrc] = useState(defaultAvatar);

    const changeOptions = changedImageSrc === defaultAvatar
        ? [{ value: "selectAlbum", label: "앨범에서 선택하기", onClick: () => handleOptionSelect("selectAlbum") }]
        : [
            { value: "setDefault", label: "기본 이미지", onClick: () => handleOptionSelect("setDefault") },
            { value: "selectAlbum", label: "앨범에서 선택하기", onClick: () => handleOptionSelect("selectAlbum") }
        ];

    return(
        <div className="change-profile-image">
            <ProfileImage 
                size = '117px'
                src = {changedImageSrc}
                key = {changedImageSrc}
            />
                        <div className="edit-icon" onClick={() => setIsMoreOptionOpen(true)}>
                <img src="/icons/ic-edit-orange.svg"/>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <MoreOption
                title="프로필 사진 수정"
                options={changeOptions}
                isOpen={isMoreOptionOpen}
                onClose={() => setIsMoreOptionOpen(false)}
            />
        </div>
    );
}

export default ChangeProfileImage;