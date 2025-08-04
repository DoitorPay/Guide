import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '@/components/input/Input';
import Button from '@/components/button/button';
import SignupLayout from '@/pages/SignupLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';
import Popup from '@/components/popupModal/popup';
import TossGroupAdmin from '@/components/group/tossGroupAdmin';

const GroupManagement = () => {
  const navigate = useNavigate();
  const { gid } = useParams(); // URL 파라미터에서 gid 가져오기
  const [groupData, setGroupData] = useState({
    groupName: '',
    groupDescription: '',
    // 이미지 관련 상태는 일단 제외
  });

  // 그룹 정보 가져오기
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/group?id=${gid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || typeof data !== 'object') {
          console.error("그룹 데이터가 올바르지 않음:", data);
          return;
        }
        setGroupData({
          groupName: data.name,
          groupDescription: data.description,
          // 이미지 관련 데이터 처리 (추후 구현)
        });
      } catch (error) {
        console.error('그룹 정보를 가져오는 데 실패했습니다:', error);
        // 에러 처리: 예를 들어, 사용자에게 알림을 표시하거나 다른 페이지로 리디렉션
      }
    };

    if (gid) {
      fetchGroupData();
    }
  }, [gid]);

  // 해산, 위임 팝업 컨트롤
  const [dissolvePopup, setDissolvePopup] = useState(false);
  const [tossPopup, setTossPopup] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null); // 추가: 선택된 멤버 ID 상태

  function toggleDissolvePopup() {
      setDissolvePopup(!dissolvePopup);
  };
  function toggleTossPopup(memberId = null) { // memberId를 인자로 받도록 수정
    setTossPopup(!tossPopup);
    setSelectedMemberId(memberId); // 선택된 멤버 ID 저장
  };

  const handleDissolveGroup = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/group/dismiss?id=${gid}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('그룹이 성공적으로 해산되었습니다.');
      navigate('/group'); // 해산 후 홈으로 이동하거나 다른 페이지로 리디렉션
    } catch (error) {
      console.error('그룹 해산에 실패했습니다:', error);
      // 에러 처리: 예를 들어, 사용자에게 알림을 표시
    }
    // finally {
    //   setDissolvePopup(false); // 팝업 닫기
    // }
  };

  // 수정사항 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('그룹 정보 수정 요청 시작');
    console.log('그룹 ID:', gid);
    console.log('요청 본문:', {
      name: groupData.groupName,
      description: groupData.groupDescription,
    });
    try {
      // 엔드포인트다 이게 아닌 것 같음
      const response = await fetch(`http://localhost:8000/api/group/register?id=${gid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: groupData.groupName,
          description: groupData.groupDescription,
          // 이미지 관련 데이터 처리 (추후 구현)
        }),
      });
      console.log('응답 수신:', response);
      if (!response.ok) {
        console.error('HTTP 에러 발생:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('그룹 정보가 성공적으로 수정되었습니다:', data);
      navigate(-1); // 수정 후 이전 페이지로 이동
    } catch (error) {
      console.error('그룹 정보를 수정하는 데 실패했습니다:', error);
      // 에러 처리
    }
  };

  // 그룹 운영 위임 처리
  const handleDelegateGroup = async () => {
    if (!selectedMemberId) {
      console.error("위임할 멤버가 선택되지 않았습니다.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/group/delegate-leader`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_id: gid,
          new_leader_id: selectedMemberId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('그룹 운영이 성공적으로 위임되었습니다.');
      navigate('/main'); // 위임 후 홈으로 이동하거나 다른 페이지로 리디렉션
    } catch (error) {
      console.error('그룹 운영 위임에 실패했습니다:', error);
    } finally {
      setTossPopup(false); // 팝업 닫기
    }
  };

  // 더미데이터, API연동
  const members = [
    { id: 1, name: "홍길동", profile: "/images/default-avatar.png" },
    { id: 2, name: "홍길순", profile: "/images/default-avatar.png" },
    { id: 3, name: "홍길차", profile: "/images/default-avatar.png" },
    { id: 4, name: "홍길타", profile: "/images/default-avatar.png" },
    { id: 5, name: "홍길오", profile: "/images/default-avatar.png" },
    { id: 6, name: "홍길동", profile: "/images/default-avatar.png" },
    { id: 7, name: "홍길순", profile: "/images/default-avatar.png" },
    { id: 8, name: "홍길차", profile: "/images/default-avatar.png" },
    { id: 9, name: "홍길타", profile: "/images/default-avatar.png" },
    { id: 10, name: "홍길오", profile: "/images/default-avatar.png" },
];

  return (
    <SignupLayout
      headerProps={{
        title: "ㅤ그룹 관리",
        type: "header-b",
        icon1: 'none'
      }}
    >
      <form className="group-management-form" onSubmit={handleSubmit}>

        <div className="input-wrap">
          <ImageUploader
            label="그룹 대표 사진"
            onChange={handleImageUpload}
            preview={groupImage}
          />

          <Input
            label="그룹 이름"
            name="groupName"
            placeholder="기존 그룹 이름"
            value={groupData.groupName}
            onChange={(e) => setGroupData({ ...groupData, groupName: e.target.value })}
            required
          />

          <Input
            label="그룹 설명"
            name="groupDescription"
            placeholder="기존 그룹 설명"
            value={groupData.groupDescription}
            onChange={(e) => setGroupData({ ...groupData, groupDescription: e.target.value })}
            required
          />

          <MissionCount
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                missionCount: e.target.value,
              }))
            }
          />

          <div className="form-terms">
            <Button
              type="third"
              buttonName="그룹 해산"
              onClick={toggleDissolvePopup}
              htmlType="button" // 폼 제출 방지
            />
            <Button
              type="third"
              buttonName="그룹 운영 위임"
              onClick={toggleTossPopup}
              htmlType="button" // 폼 제출 방지
            />
          </div>
        </div>

        <div className="confirm-wrap">
          <Button
            type="primary"
            buttonName="수정 완료"
            htmlType="submit" // 폼 제출
          />
        </div>
      </form>

      <Popup
          icon="error-gray"
          title="그룹을 해산하시겠어요?"
          subtitle="해산한 그룹은 다시 복구할 수 없어요."
          buttonName="해산"
          onClick={handleDissolveGroup}
          onSecondClick={toggleDissolvePopup}
          button2Name="취소"
          setPopup={dissolvePopup}
        />
        <TossGroupAdmin
          members={members}
          onClick={toggleTossPopup} // 취소 버튼
          onSecondClick={handleDelegateGroup} // 위임하기 버튼에 위임 함수 연결
          setPopup={tossPopup}
        />
    </SignupLayout>
  );
};

export default GroupManagement;
