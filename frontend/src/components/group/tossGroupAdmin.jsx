import React, { useState } from "react";
import Button from '@/components/button/button';
import ProfileImage from '@/components/profile/profileImage';

const TossGroupAdmin = ({
    onClick,
    onSecondClick,
    setPopup = true,
    members,
}) => {
    const [selectedMember, setSelectedMember] = useState(members[0].id);

    const handleMemberSelect = (memberId) => {
        setSelectedMember(memberId);
    };

    return (
        <>
            {setPopup && (
                <div className="toss-group-admin">
                    <div className="toss-group-admin__container">
                        <p className="title">운영을 위임할 그룹원 선택</p>
                        <div className="person-list">
                            {members.map((member) => (
                                <label key={member.id}>
                                    <input
                                        type="radio"
                                        name="select-admin"
                                        value={member.id}
                                        checked={selectedMember === member.id}
                                        onChange={() => handleMemberSelect(member.id)}
                                    />
                                    <ProfileImage 
                                        size="clamp(44px, 5vw, 46px)"
                                        src={member.profile}
                                    />
                                    <p className="name">{member.name}</p>
                                </label>
                            ))}
                        </div>
                        <div className="button-wrapper">
                            <Button
                                type="primary"
                                buttonName="취소"
                                aria="취소 클릭"
                                onClick={onClick}
                                bgColor="var(--color-gray-scale-50)"
                                textColor="var(--Grayscale-Gray-700)"
                            />
                            <Button
                                type="primary"
                                buttonName="위임하기"
                                aria="위임하기 클릭"
                                onClick={onSecondClick}
                            />
                        </div>
                    </div>
                    <div className="overlay"></div>
                </div>
            )}
        </>
    )
}

export default TossGroupAdmin;