import React, { useEffect, useState } from "react";
import SignupLayout from "@/pages/signupLayout";
import Header from "@/components/header/header";
import Navigation from "@/components/nav/nav";
import ChangeProfileImage from "@/components/profile/changeProfileImage";
import Input from "@/components/Input/input";
import TopicSelect from "@/components/profile/topicSelect";
import Button from "@/components/button/button";
import { useNavigate } from 'react-router-dom';
import Popup from '@/components/popupModal/popup';

const Profile = () => {
    const [nicknameAvailable, setNicknameAvailable] = useState(null);

    const navigate = useNavigate(); // useNavigate 훅 추가

    const [nickname, setNickname] = useState("");
    const [quote, setQuote] = useState('');

    const putModify = async() => {
        const modifiedData = {
            nickname: nickname,
            quote: quote,
        }
        console.log("----- PUT 데이터 -----");
        console.log(JSON.stringify(modifiedData, null, 2));
        console.log("-------------------");
        try {
            const response = await fetch("http://localhost:8000/user/change-info", {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({modifiedData})
            });
            if(!response.ok) {
                throw new Error(`오류!: ${response.status}`);
            } else {
                setSetPopup(true);
            }
            
        } catch (error) {
            console.error('수정사항 저장 실패:', error);
            alert('수정사항 저장 중 오류가 발생했습니다.');
        }
    };

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
        navigate('/profile-topic');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    // 상태메시지 불러오기
    useEffect(() => {
        const fetchQuote = async() => {
            try {
                const response = await fetch("http://localhost:8000/user/user_properties", {
                    credentials: "include",
                    });
                if (!response.ok) {
                    throw new Error(`오류!: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log("----- GET 데이터 -----");
                console.log(JSON.stringify(jsonData, null, 2));
                console.log("-------------------");
                setQuote(jsonData[0].quote || '');
            } catch(error) {
                console.error('상태메시지 불러오기 실패:', error);
                setQuote('상태메시지를 불러올 수 없습니다.')
            }
        };

        fetchQuote();
    }, []);


    const [setPopup, setSetPopup] = useState(false);
    function toggleSetPopup() {
        setSetPopup(!setPopup);
    }


    return (
        <SignupLayout
        contentBg="var(--color-background)"
        headerProps={{ title: "ㅤ프로필", type: "header-b", icon1: 'none' }}
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
                        name="quote"
                        maxLength={20}
                        placeholder="상태메시지를 입력해주세요."
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                    />
                </div>

                <div className="topic-wrap">
                    <TopicSelect 
                        mode="profile-topic"
                        onClick={handleTopicSelectClick}
                    />
                </div>
            </div>


            <div className="save-wrap">
                <Button
                    type="primary"
                    buttonName="수정사항 저장하기"
                    onClick={putModify}
                />
            </div>
        </div>
        <Popup
            icon="done-gray"
            title="프로필 수정이 완료되었습니다."
            buttonName="확인"
            onClick={toggleSetPopup}
            setPopup={setPopup}
        />
        </SignupLayout>
    );
};

export default Profile;
