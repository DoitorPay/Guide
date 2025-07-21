import React, { useState } from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import LikeButton from '@/components/button/likeButton';

const HeartProfile = ({ avatar, user }) => {
    return (
        <div className="heart-profile" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <div>
                <ProfileImage src={avatar} size={46} />
                <span className="heart-profile-name">ㅎㅇ</span> 
                {/* 이거 추후에 닉+며칠전 컴포넌트로 교체해야함 진이가 만든거 */}
            </div>
            <LikeButton initialCount={0} initialLiked={false} filledHeartSrc="/icons/heart-filled.svg" emptyHeartSrc="/icons/heart-empty.svg" size={24} />
        </div>
    );
};

export default HeartProfile;
