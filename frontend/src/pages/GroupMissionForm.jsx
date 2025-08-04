import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '@/components/input/Input';
import SubTitle from '@/components/subtitle/subTitle';
import Button from '@/components/button/button.jsx';
import SignupLayout from '@/pages/signupLayout';
// import ImageUploader from '@/components/group/ImageUploader';


const GroupMissionForm = () => {
  const { gid } = useParams();
  console.log(`gid: ${gid}`);
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null); // 그룹 데이터를 위한 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태를 false로 변경
  const [error, setError] = useState(null); // 에러 상태 추가
  const [missions, setMissions] = useState([]);


  const fetchGroupData = useCallback(async() => {
    setLoading(true); // 요청 시작 시 로딩 상태 true
    setError(null); // 에러 상태 초기화
    try {
      const response = await fetch(`http://localhost:8000/api/group?id=${gid}`);
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '그룹 정보를 가져오는 데 실패했습니다.');
      }
      const data = await response.json();
      setGroupData(data); // 가져온 데이터를 상태에 저장
      console.log("----- 그룹 데이터 GET -----");
      console.log(JSON.stringify(data, null, 2));
      console.log("-------------------");
    } catch(err) {
      console.error('네트워크 에러 또는 서버 응답 문제:', err);
      setError(err.message); // 에러 발생 시 에러 상태 업데이트
    } finally {
      setLoading(false); // 요청 완료 시 로딩 상태 false
    }
  }, [gid])

  useEffect(() => {
    if (gid) { // gid가 있을 때만 데이터 가져오기
      fetchGroupData();
    }
  }, [gid, fetchGroupData]); // gid 또는 fetchGroupData가 변경될 때마다 실행 (fetchGroupData는 useCallback으로 안정적임)

  // groupData가 로드되면 missions 배열 초기화
  useEffect(() => {
    if (groupData && groupData.num_goals) {
      setMissions(new Array(groupData.num_goals).fill(''));
    }
  }, [groupData]);




  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validMissions = missions.filter(mission => mission.trim() !== '');

    try {
      const response = await fetch(`http://localhost:8000/api/group/todo?id=${gid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todos: validMissions.map((mission, index) => ({
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
      navigate(`/group/${gid}`); // 그룹 상세 페이지로 이동
    } catch (error) {
      console.error('미션 생성 실패:', error);
      alert('미션 생성에 실패했습니다.');
    }
  };

  const handleMissionChange = (index, value) => {
    const newMissions = [...missions];
    newMissions[index] = value;
    setMissions(newMissions);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }
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
              <SubTitle title={`설정된 그룹 미션 개수 : ${groupData?.num_goals || 0}개`}/>
          </div>

          <span className="required">*</span> <span>는 필수 입력란입니다.</span>

      {missions.map((mission, index) => (
        <div key={index} className="form-section">
          <Input
            label={`미션 ${index + 1}`}
            name={`mission${index + 1}`}
            placeholder="미션을 작성해주세요. (최대 30자)"
            required
            value={mission}
            onChange={(e) => handleMissionChange(index, e.target.value)}
          />
        </div>
      ))}
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
