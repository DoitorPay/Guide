import React, { useState } from "react";
// 컴포넌트 목록
import Input from "@/components/Input/input";
import CmpButton from "@/guide/cmpButton"
import CmpHeader from "@/guide/cmpHeader";
import MainLayout from "@/pages/mainLayout";
import Navigation from "@/components/nav/nav"; 
import CheckboxDemo from "@/guide/CheckboxDemo";
import Roulette from "@/components/roulette/roulette";
import TagGuide from "@/guide/tagGuide";
import CmpTodoList from "@/guide/cmpTodoList";
import CalendarGuide from '@/guide/calendarGuide';
import ProfileGuide from "@/guide/cmpProfile";
import GroupCardDemo from "@/guide/GroupCardDemo";
import HomeProfile from "@/components/profile/homeProfile";
import ProgressCard from "@/components/card/progressCard";
import SubTitleGuide from "@/guide/subTitleGuide";
import HistoryCard from "@/components/card/HistoryCard";
import RankingGuide from "@/guide/rankingGuide";
import GroupFloatingButton from "@/components/group/GroupFloatingButton";
import PanaltyNoti from "@/components/panalty/panaltyNoti";
import ProfileCard from "@/components/profile/ProfileCard";
import SettingGuide from "@/guide/settingGuide";
import LevelProgress from "@/components/myPage/LevelProgress";
import PopupGuide from "@/guide/popupGuide";
import MoreOptionGuide from "@/guide/moreOptionGuide";
import LikeButton from "@/components/button/likeButton";
import ImageUploader from "@/components/group/ImageUploader";
import MissionCount from "@/components/group/MissionCount";
import GroupDetailPopup from "@/components/popupModal/GroupDetailPopup";
import GroupSearchInput from "@/components/group/GroupSearchInput";
import MissionFeedGuide from "@/guide/MissionFeedGuide";
import HeartProfile from "@/components/profile/heartProfile";
import PunishmentContent from "@/components/card/PunishmentContent";
import ChangeProfileImage from "@/components/profile/changeProfileImage";
import TopicSelect from "@/components/profile/topicSelect";
import TossGroupAdminGuide from "@/guide/tossGroupAdminGuide";

const groupedItemList = [
  {
    group: '기본 컴포넌트',
    items: [
      { id: 3, name: '버튼', path: '@/guide/cmpButton', component: <CmpButton /> },
      { id: 5, name: '텍스트 필드', path: '@/components/input', component: <Input /> },
      { id: 8, name: '체크박스', path: '@/components/Checkbox', component: <CheckboxDemo /> },
      { id: 10, name: '헤더', path: '@/guide/cmpHeader', component: <CmpHeader /> },
      { id: 11, name: '태그', path: '@/guide/tagGuide', component: <TagGuide /> },
      { id: 18, name: '서브 타이틀', path: '@/guide/subTitleGuide', component: <SubTitleGuide /> },
      { id: 28, name: '좋아요', path: '@/components/button/likeButton', component: <LikeButton /> },
    ],
  },
  {
    group: '프로필 및 사용자 인터페이스',
    items: [
      { id: 14, name: '프로필', path: '@/guide/cmpProfile', component: <ProfileGuide /> },
      { id: 16, name: '오늘 큰 전진입니다~', path: '@/components/homeProfile', component: <HomeProfile /> },
      { id: 17, name: '오늘의 진행 상황', path: '@/components/progressCard', component: <ProgressCard /> },
      { id: 24, name: '마이페이지 프로필 카드', path: '@/components/profile/ProfileCard', component: <ProfileCard /> },
      { id: 35, name: '하트 프로필', path: '@/components/profile/heartProfile', component: <HeartProfile /> },
      { id: 36, name: '프로필 사진 변경', path: '@/components/profile/heartProfile', component: <ChangeProfileImage  /> },
      { id: 37, name: '스터디 주제 선택(프로필 페이지 내)', path: '@/components/profile/topicSelect', component: <TopicSelect /> }
    ],
  },
  {
    group: '그룹 기능',
    items: [
      { id: 15, name: '그룹 카드', path: '@/guide/GroupCardDemo', component: <GroupCardDemo /> },
      { id: 21, name: '그룹 플로팅 버튼', path: '@/components/group/GroupFloatingButton', component: <GroupFloatingButton /> },
      { id: 20, name: '랭킹 컴포넌트', path: '@/components/ranking/-', component: <RankingGuide /> },
      { id: 29, name: '사진 업로드', path: '@/components/group/ImageUploader', component: <ImageUploader /> },
      { id: 31, name: '미션 개수 증감', path: '@/components/group/ImageUploader', component: <MissionCount /> },
      { id: 32, name: '그룹 정보 팝업', path: '@/components/group/ImageUploader', component: <GroupDetailPopup /> },
      { id: 33, name: '그룹 검색', path: '@/components/group/GroupSearchInput', component: <GroupSearchInput /> },
      { id: 38, name: '그룹 운영 위임 팝업', path: '@/guide/tossGroupAdminGuide', component: <TossGroupAdminGuide /> }
    ],
  },
  {
    group: '유틸/레이아웃/기타',
    items: [
      { id: 6, name: '레이아웃', path: '@/pages/mainLayout', component: <MainLayout /> },
      { id: 7, name: '네비게이션', path: '@/components/nav', component: <Navigation /> },
      { id: 9, name: '룰렛', path: '@/components/roulette', component: <Roulette /> },
      { id: 12, name: '투두리스트', path: '@/components/todoList', component: <CmpTodoList /> },
      { id: 13, name: '캘린더', path: '@/guide/calendarGuide', component: <CalendarGuide /> },
      { id: 19, name: '벌칙 히스토리 카드', path: '@/components/HistoryCard', component: <HistoryCard /> },
      { id: 22, name: '벌칙 알림창', path: '@/components/panalty/panaltyNoti', component: <PanaltyNoti />},
      { id: 23, name: '메뉴', path: '@/components/myPage/SettingSection', component: <SettingGuide />},
      { id: 25, name: '레벨 프로그레스바', path: '@/components/myPage/LevelProgress', component: <LevelProgress />},
      { id: 26, name: '팝업', path: '@/guide/popupGuide', component: <PopupGuide /> },
      { id: 27, name: '더보기 옵션(모달)', path: '@/guide/moreOptionGuide', component: <MoreOptionGuide /> },
      { id: 34, name: '그룹, 벌칙 미션피드', path: '@/components/MissionFeed', component: <MissionFeedGuide /> },
      { id: 30, name: '벌칙 인증 상세', path: '@/components/card/PunishmentContent', component: <PunishmentContent /> },
    ],
  },
];


export default function CmpSidebar() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="inner-wrap cmp-sidebar">
      {groupedItemList.map((group, groupIdx) => (
  <div key={groupIdx} className="cmp-sidebar__group">
    <h4 className="cmp-sidebar__group-title">{group.group}</h4>
    <ul>
      {group.items.map((item) => (
        <li
          key={item.id}
          onClick={() => setSelectedItem(item)}
          className={selectedItem?.id === item.id ? 'selected' : ''}
        >
          {item.name}
        </li>
      ))}
    </ul>
  </div>
))}


      <div className="cmp-sidebar__components">
        {selectedItem ? (
          <>
            <h3>{selectedItem.name}</h3>
            <p className="cmp-channel">📂 경로: {selectedItem.path}</p>
            {selectedItem.component}
          </>
        ) : (
          <p>컴포넌트를 선택하세요.</p>
        )}
      </div>
    </div>
  );
}
