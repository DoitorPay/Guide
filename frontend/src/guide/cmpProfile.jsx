import React from "react";
import ProfileImage from "@/components/Profile/ProfileImage";
import ProfileName from "@/components/Profile/ProfileName";
import UserProfileRow from "@/components/Profile/UserProfileRow";

const dummyAvatar = "https://picsum.photos/40";

const ProfileGuide = () => {
  return (
    <div>
        <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>user info와 연동이 안되어있음 아직 틀만 있는 상태 <br/> 우선 profile이 필요한 컴포넌트는 이거 쓰세요</h1>

      <p>
        ProfileImage<br />
        - src: 이미지 URL (db연동작업 필요 ) <br />
        - alt: 대체 텍스트 (기본값: '프로필 이미지')<br />
        - size: 이미지 크기(px) (기본값: 40)<br />
        - border 사용시 2px 테두리 적용
      </p>
      <div className="example-guide">
        <ProfileImage src={dummyAvatar} alt="유저 프로필 이미지" size={40} />
        <p>불러올 프로필 이미지 없으면 defaultAvatar로 표시</p>
        <ProfileImage size={40} />
        <ProfileImage size={60} border/>

      </div>
      <br />

      <p>
        ProfileName<br />
        - name: 유저 이름 <br />
        - size: sm : 14 / md : 기본 16 <br />
        - weight: semibold / bold / 기본 default <br />
        - link: 클릭 시 이동할 링크 - 프로필 페이지 생길 시 연결 예정
      </p>
      <div className="example-guide">
        <ProfileName name="유진 sm" size="sm" /> <br />
        <ProfileName name="김재림 md 볼드" weight="bold"/> <br />
        <ProfileName name="김휘재 sm 세미볼드" size="sm" weight="semibold" /> <br />
        <ProfileName name="최상준 전체 기본값" link="/profile" />
      </div>
      <br /><br />

      <p>
        UserProfileRow<br />
        - variant: horizontal / vertical / postMeta<br />
        - date: 날짜 텍스트 - 게시글 컴포넌트에 사용 예정, 연결 작업 진행 안함 <br />
        - size: 이미지 크기 (이건 조정할 필요 없으면 삭제해도 될듯??..)
      </p>
        <div className="example-guide">
        <p>variant: horizontal</p>
            <UserProfileRow variant="horizontal" src={dummyAvatar} name="유진" />

            <p className="guide-text-desc">variant: vertical</p>
            <UserProfileRow variant="vertical" src={dummyAvatar} name="김재림" size={48} />

            <p className="guide-text-desc">variant: postMeta</p>
            <UserProfileRow variant="postMeta" name="최상준" date="1일 전" />
        </div>
    </div>
  );
};

export default ProfileGuide;
