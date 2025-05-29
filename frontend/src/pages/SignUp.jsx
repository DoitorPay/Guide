import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const isFormValid = nickname && birthdate && gender && email && agree;

  return (
    <div className="signup-wrapper">
      <div className="signup-body">
        <p className="signup-description">
          기본 정보를 입력해주세요<br />
          <span className="required">* 는 필수 입력란입니다.</span>
        </p>

        <Input
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해주세요. (최대 10글자)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <Input
          label="생년월일"
          name="birthdate"
          placeholder="YYYY.MM.DD"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <div className="gender-selection">
          <label className="input-label">성별</label>
          <div className="gender-buttons">
            <button
              className={`gender-btn ${gender === '남성' ? 'active' : ''}`}
              onClick={() => setGender('남성')}
            >
              남성
            </button>
            <button
              className={`gender-btn ${gender === '여성' ? 'active' : ''}`}
              onClick={() => setGender('여성')}
            >
              여성
            </button>
          </div>
        </div>

        <Input
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="agree-section">
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>개인정보 수집 및 이용 동의</span>
          </label>
          <button className="view-more">약관 보기</button>
        </div>
      </div>

      <div className="signup-footer">
        <Button
          htmlType="button"
          type="default"
          buttonName="계속하기"
          disabled={!isFormValid}
          onClick={async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:8000/auth/signUpForm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nickname: nickname,
                birth: birthdate,
                gender: gender,
                email: email
              })
            })

            if (!response.ok) {
              throw new Error('error!');
            }
          }
        }
        />
      </div>
    </div>
  );
};

export default SignUp;
