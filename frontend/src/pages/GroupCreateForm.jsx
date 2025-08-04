import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/input/Input';
import Checkbox from '@/components/input/Checkbox';
import Button from '@/components/button/button.jsx';
import SubTitle from '@/components/subtitle/subTitle';
import SignupLayout from '@/pages/signupLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';
import ArrowDown from '/icons/arrow-bottom.svg';
import GroupDurationSelector from '@/components/group/GroupDurationSelector';
import MissionDaySelector from '@/components/group/MissionDaySelector';
import TopicSelect from '@/components/profile/topicSelect';

const GroupCreateForm = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    groupName: '',
    groupDescription: '',
    studyTopic: '',
    penaltyTopic: '',
    thumbnail: '',
    missionCount: 1,
    missionDay: '',
    duration_weeks: null,
    end_date: '',
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  const groupTopics = JSON.parse(localStorage.getItem('groupTopics')) || [];
  const penaltyTopics = JSON.parse(localStorage.getItem('penaltyTopics')) || [];

  const payload = {
    name: formData.groupName,
    description: formData.groupDescription,
    topic: groupTopics,
    num_goals: Number(formData.missionCount),
    conf_date: formData.missionDay,
    duration: isChecked ? 0 : formData.duration_weeks,
    end_date: isChecked || !formData.end_date ? null : formData.end_date,
    punish: penaltyTopics,
  };

  console.log("----- 최종전송 Payload -----");
  console.log(JSON.stringify(payload, null, 2));
  console.log("--------------------------");

  try {
    const res = await fetch('http://localhost:8000/api/group/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('그룹 생성 실패');

    alert('그룹이 성공적으로 생성되었습니다!');
    navigate('/group');
  } catch (error) {
    console.error('그룹 생성 오류:', error);
    alert('그룹 생성 중 오류가 발생했습니다.');
  }
};



  const handleImageUpload = async (file) => {
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('http://13.209.6.223:8080', {
        method: 'POST',
        body: form,
      });
      const text = await res.text(); 
      setFormData((prev) => ({ ...prev, thumbnail: text }));
    } catch (error) {
      console.error('썸네일 업로드 실패:', error);
    }
  };

  return (
    <SignupLayout
      headerProps={{
        type: 'header-b',
        title: 'ㅤ그룹 생성',
        icon1: 'none',
      }}
    >
      <form className="group-create-form" onSubmit={handleSubmit}>
        <SubTitle title="그룹 정보를 입력해주세요" />
        <div className="info-text">
          <span className="required">*</span> <span>는 필수 입력란입니다.</span>
        </div>

        <div className="form-section">
          <Input
            label="그룹 이름"
            name="groupName"
            placeholder="그룹 이름을 입력해주세요."
            value={formData.groupName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, groupName: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-section">
          <Input
            label="그룹 설명"
            name="groupDescription"
            placeholder="그룹 설명을 적어주세요."
            value={formData.groupDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                groupDescription: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="form-section">
          <ImageUploader onChange={handleImageUpload} />
        </div>

        <div className="form-section">
          <TopicSelect
            label="스터디 주제"
            name="studyTopic"
            value={formData.studyTopic}
            onClick={() => navigate('/group-select')}
            mode="group-topic" // Add mode prop
          />
        </div>

        <div className="form-section">
          <TopicSelect
            label="벌칙 주제"
            name="penaltyTopic"
            value={formData.penaltyTopic}
            onClick={() => navigate('/penalty-select')}
            mode="penalty-topic" // Add mode prop
          />
        </div>

        <div className="form-section">
          <MissionCount
            value={formData.missionCount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                missionCount: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-section">
          <MissionDaySelector
            value={formData.missionDay}
            onChange={(selectedDay) =>
              setFormData((prev) => ({
                ...prev,
                missionDay: selectedDay,
              }))
            }
          />
        </div>

        <div className="form-section form-terms">
          <GroupDurationSelector
            isChecked={isChecked}
            onChange={({ duration_weeks, end_date }) =>
              setFormData((prev) => ({
                ...prev,
                duration_weeks,
                end_date,
              }))
            }
          />
          <div className="checkbox-wrap">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span>
              기간을 정하지 않고 진행할래요. (추후 그룹 해산을 통해 종료할 수
              있습니다.)
            </span>
          </div>
        </div>

        <div className="form-section">
          <Button type="primary" buttonName="생성하기" onClick={handleSubmit} />
        </div>
      </form>
    </SignupLayout>
  );
};

export default GroupCreateForm;
