import { React, useState } from 'react';
import Input from '@/components/input/Input';
import Checkbox from '@/components/input/Checkbox';
import Button from '@/components/button/button.jsx';
import SubTitle from '@/components/subtitle/subTitle';
import MainLayout from '@/pages/MainLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';
import ArrowDown from '/icons/arrow-bottom.svg'
import GroupDurationSelector from '@/components/group/GroupDurationSelector';
import MissionDaySelector from '@/components/group/MissionDaySelector';
import TopicSelect from '@/components/profile/topicSelect';

const GroupCreateForm = () => {

  const [formData, setFormData] = useState({
  groupName: '',
  groupDescription: '',
  studyTopic: '',
  penaltyTopic: '',
  thumbnail: null,
  missonCount: 0,
  missionDay: '',
  duration_weeks: null,
  end_date: '',
});

    const [isChecked, setIsChecked] = useState(false);
    
    
  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    is_duration_unlimited: isChecked,
    duration_weeks: isChecked ? null : formData.duration_weeks,
    end_date: isChecked ? null : formData.end_date,
  };

  console.log("보낼 데이터:", payload);
};
  return (
    <MainLayout
              headerProps={{
                type: "header-b",
                title: "그룹 생성",
                icon1: "none",
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
    setFormData((prev) => ({ ...prev, groupDescription: e.target.value }))
  }
      required
    />
  </div>

  <div className="form-section">
    {/* <p>그룹 대표 사진 <span className="required">*</span></p> */}
    <ImageUploader 
    onChange={(e) =>
    setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))
  }/>
  </div>

  <div className="form-section">
    <TopicSelect 
     label="스터디 주제"
  name="studyTopic"
  value={formData.studyTopic}
  onChange={(e) =>
    setFormData((prev) => ({ ...prev, studyTopic: e.target.value }))
  }
    />
  </div>

  <div className="form-section">
    <TopicSelect 
     label="벌칙 주제"
  name="penaltyTopic"
  value={formData.penaltyTopic}
  onChange={(e) =>
    setFormData((prev) => ({ ...prev, penaltyTopic: e.target.value }))
  }
    />
  </div>

  <div className="form-section">
    {/* <p>그룹 목표 개수 <span className="required">*</span></p> */}
    <MissionCount 
    onChange={(e) =>
    setFormData((prev) => ({ ...prev, missionCount: e.target.value }))
  }
    />
  </div>

  <div className="form-section">
    <MissionDaySelector
      value={formData.missionDay}
      onChange={(selectedDay) =>
        setFormData((prev) => ({ ...prev, missionDay: selectedDay }))
      }
    />
  </div>

  <div className="form-section form-terms">
    <GroupDurationSelector
  isChecked={isChecked}
  onChange={({ duration_weeks, end_date }) => {
    setFormData(prev => ({
      ...prev,
      duration_weeks,
      end_date
    }));
  }}
/>
    <div className="checkbox-wrap">
      <Checkbox checked={isChecked} onChange={setIsChecked} />
      <span>기간을 정하지 않고 진행할래요. (추후 그룹해산을 통해 스터디를 종료할 수 있습니다.)</span>
    </div>
  </div>


  <div className="form-section">
    <Button type="primary" buttonName="생성하기" />
  </div>
</form>

</MainLayout>
  );
};

export default GroupCreateForm;
