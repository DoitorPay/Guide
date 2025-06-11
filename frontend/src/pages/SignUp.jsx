import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(null); 

  const navigate = useNavigate();

  const handleSubmit = async () => {
  if (!isFormValid) return;

  try {
    const id = localStorage.getItem('id');   
    const sns = localStorage.getItem('sns');  

    if (!id || !sns) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    const payload = {
      nickname,
      birthdate,
      gender,
      email,
      ...(sns === 'kakao' ? { kakao_id: id } : { naver_id: id })
    };

    const response = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('회원가입 실패:', errorData);
      alert('회원가입에 실패했습니다.');
      return;
    }

    const data = await response.json();
    console.log('회원가입 성공:', data);
    navigate('/studytopic');
  } catch (error) {
    console.error('에러 발생:', error);
    alert('회원가입 도중 오류가 발생했습니다.');
  }
};



const checkNickname = async () => {
  if (!nickname) return;

  try {
    const response = await fetch(`http://localhost:8000/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`);
    if (!response.ok) throw new Error();

    const data = await response.json();
    setNicknameAvailable(data.available);
  } catch (error) {
    console.error('중복확인 오류:', error);
    alert('중복확인 중 오류가 발생했습니다.');
  }
};

  const isFormValid = nickname && email && agree;

  return (
    <div className="signup-wrapper">
      <div className="signup-body">
        <p className="signup-description">
          <p style={{color: "black", fontSize: "18px", fontWeight:"700"}}>기본 정보를 입력해주세요.<br /></p>
          <span className="required">*</span> <span> 는 필수 입력란입니다.</span>
        </p>

       <div className="nickname-check-wrap" style={{ display: 'flex', gap: '8px', width: "350px", alignItems: 'flex-end' }}>
        <Input
          label="닉네임"
          name="nickname"
          required
          maxLength={10}
          placeholder="닉네임을 입력해주세요. (최대 10글자)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{ flex: 1 , width: "265px"}}
        />

        <Button
          type="default"
          buttonName="중복확인"
          aria="닉네임 중복확인"
          onClick={checkNickname}
         style={{ marginTop: "20px",}}
        />
        {nicknameAvailable !== null && (
          <p style={{ color: nicknameAvailable ? 'green' : 'red', fontSize: '12px', marginTop: '4px' }}>
            {nicknameAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'}
          </p>
        )}
      </div>


        <Input
          label="생년월일"
          name="birthdate"
          placeholder="생년월일 8자리를 입력해주세요."
          value={birthdate}
          inputMode="numeric"
           onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/[^0-9.]/g, '');
            setBirthdate(onlyNumbers);
          }}
        />

        <div className="gender-selection">
          <label className="input-label">성별</label>
          <div className="gender-buttons">
            <button
              type="button"
              className={`gender-btn ${gender === '남성' ? 'active' : ''}`}
              onClick={() => setGender('남성')}
            >
              남성
            </button>
            <button
              type="button"
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
          required
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="agree-section" style={{marginTop: "120px"}}>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>개인정보 수집 및 이용 동의</span>
          </label>
          <button type="button" className="view-more">약관 보기</button>
        </div>
      </div>

      <div className="signup-footer">
        <Button
          type="default"
          buttonName="계속하기"
          disabled={!isFormValid}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SignUp;
