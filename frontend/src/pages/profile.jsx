import React, { useEffect, useState } from "react";
import SignupLayout from "@/pages/signupLayout";
import Header from "@/components/header/header";
import Navigation from "@/components/nav/nav";
import ChangeProfileImage from "@/components/profile/changeProfileImage";
import Input from "@/components/Input/input";
import TopicSelect from "@/components/profile/topicSelect";
import Button from "@/components/button/button";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [nicknameAvailable, setNicknameAvailable] = useState(null);

    const navigate = useNavigate(); // useNavigate 훅 추가

    const [nickname, setNickname] = useState("");
    useEffect(() => {
        const fetchNickname = async () => {
        try {
            const res = await fetch("http://localhost:8000/user/nickname", {
            credentials: "include",
            });
            const data = await res.json();
            setNickname(data.profile);
        } catch (error) {
            console.error("닉네임 불러오기 실패:", error);
            setNickname("사용자");
        }
        };

        fetchNickname();
    }, []);

    const checkNickname = async () => {
        if (!nickname) return;

        try {
        const response = await fetch(
            `http://localhost:8000/auth/check-nickname?nickname=${encodeURIComponent(
            nickname
            )}`
        );
        if (!response.ok) throw new Error();

        const data = await response.json();
        setNicknameAvailable(data.available);
        } catch (error) {
        console.error("중복확인 오류:", error);
        alert("중복확인 중 오류가 발생했습니다.");
        }
    };

    const handleTopicSelectClick = () => {
        navigate('/studytopic');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <SignupLayout
        contentBg="var(--color-background)"
        headerProps={{ title: "프로필", type: "header-b", icon1: "arrow-left", icon1OnClick: handleGoBack }}
        >
        <div className="profile-wrapper">
                <ChangeProfileImage />

            <div className="input-wrap">
                <div className="nickname-check-wrap">
                    <Input
                        label="닉네임"
                        name="nickname"
                        required
                        maxLength={10}
                        placeholder="닉네임을 입력해주세요. (최대 10글자)"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <Button
                        type="default"
                        buttonName="중복확인"
                        aria="닉네임 중복확인"
                        onClick={checkNickname}
                    />
                    {nicknameAvailable !== null && (
                        <p
                        className={`nickname-check-message ${
                            nicknameAvailable ? "available" : "unavailable"
                        }`}
                        >
                        {nicknameAvailable
                            ? "사용 가능한 닉네임입니다."
                            : "이미 사용 중인 닉네임입니다."}
                        </p>
                    )}
                </div>

                <div className="message-warp">
                    <Input
                        label="상태메시지"
                        name="nickname"
                        maxLength={10}
                        placeholder="상태메시지를 입력해주세요."
                        value="아자아자 화이팅 ~!"
                    />
                </div>

                <div className="topic-wrap">
                    <TopicSelect 
                        onClick={handleTopicSelectClick}
                    />
                </div>
            </div>


            <div className="save-wrap">
                <Button
                    type="primary"
                    buttonName="수정사항 저장하기"
                />
            </div>
        </div>
        </SignupLayout>
    );
};

export default Profile;
