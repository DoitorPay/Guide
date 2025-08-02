import { React, useState } from 'react';
import Input from '@/components/input/Input';
import SubTitle from '@/components/subtitle/subTitle';
import Button from '@/components/button/button.jsx';
import SignupLayout from '@/pages/signupLayout';
// import ImageUploader from '@/components/group/ImageUploader';


const GroupMissionForm = () => {
  const [mission1, setMission1] = useState('');
  const [mission2, setMission2] = useState('');
  const [mission3, setMission3] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missions = [mission1, mission2, mission3].filter(mission => mission.trim() !== '');

    try {
      const response = await fetch('http://localhost:8000/api/group/todo?id=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todos: missions.map((mission, index) => ({
            id: `${index + 1}`,
            item: mission,
            done: 'false',
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('성공:', result);
      alert('미션이 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('미션 생성 실패:', error);
      alert('미션 생성에 실패했습니다.');
    }
  };

  return (
    <SignupLayout
              headerProps={{
                type: "header-b",
                title: "ㅤ그룹 미션",
                icon1: 'none',
              }}
            >
        <form className="group-create-form" onSubmit={handleSubmit}>

          <div className="form-section">
              <SubTitle title="설정된 그룹 미션 개수 : 2개"/>
            {/* 그룹 미션 개수 props로 받아와야함 */}
          </div>

          <span className="required">*</span> <span>는 필수 입력란입니다.</span>

      <div className="form-section">
      <Input
        label="미션 1"
        name="mission1"
        placeholder="미션을 작성해주세요. (최대 30자)"
        required
        value={mission1}
        onChange={(e) => setMission1(e.target.value)}
      />
      </div>

      <div className="form-section">
      <Input
        label="미션 2"
        name="mission2"
        placeholder="미션을 작성해주세요. (최대 30자)"
        required
        value={mission2}
        onChange={(e) => setMission2(e.target.value)}
      />
      </div>

      <div className="form-section">
      <Input
        label="미션 3"
        name="mission3"
        placeholder="미션을 작성해주세요. (최대 30자)"
        required
        value={mission3}
        onChange={(e) => setMission3(e.target.value)}
      />
      </div>
      <div className="form-section">
    <div className="form-terms">
        
        </div>
        <Button
        type="primary"
        buttonName="생성 완료"
        onClick={handleSubmit} // 폼 제출을 위한 handleSubmit 연결
        />
      </div>
    </form>
            </SignupLayout>
  );
};

export default GroupMissionForm;
