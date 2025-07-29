import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CmpGuide from "@/guide/cmpGuide";
import CssGuide from "@/guide/cssGuide";
import PubGuide from "@/guide/pubGuide";
import FrontGuide from "@/guide/frontGuide";
import GuideHeader from "@/components/header/guideHeader";
import SignUp from "@/pages/SignUp.jsx";
import TopicSelect from "@/pages/TopicSelect.jsx";
import GroupDetail from "@/pages/GroupDetail.jsx";
import MainPage from "@/pages/home.jsx";
import TodoListPage from "@/pages/todoList.jsx";
import Penalty from "@/pages/penalty.jsx";
import GroupCreateForm from "@/pages/GroupCreateForm";
import MyPage from "@/pages/myPage";
import GroupMissionForm from "@/pages/GroupMissionForm";
import GroupManagement from "@/pages/GroupManagement";
import GroupSearch from "@/pages/GroupSearch";
import Landing from "@/pages/landing";
import Group from "@/pages/Group";
import Profile from "@/pages/profile";
import PenaltyUpload from "@/pages/penaltyUpload";
import PenaltyCertification from "@/pages/PenaltyCertification";
import NoticePage from '@/pages/myPage/NoticePage';
import HelpPage from '@/pages/myPage/HelpPage';
import TermsPage from '@/pages/myPage/TermsPage';
import PrivacyPage from '@/pages/myPage/PrivacyPage';

const LayoutWithHeader = ({ children }) => {
  const location = useLocation();
  const hideHeader = 
                     location.pathname.startsWith("/additRegister") ||
                     location.pathname.startsWith("/topic-select") ||
                     location.pathname.startsWith("/groupdetailguide") ||
                     location.pathname.startsWith("/todoList") ||
                     location.pathname.startsWith("/main") ||
                     location.pathname.startsWith("/mypage") ||
                     location.pathname.startsWith("/group") ||
                     location.pathname.startsWith("/landing") ||
                     location.pathname.startsWith("/groupmanage") ||
                     location.pathname.startsWith("/searchgroup") ||
                     location.pathname.startsWith("/todolist") ||
                     location.pathname.startsWith("/penalty") ||
                     location.pathname.startsWith("/profile") ||
                     location.pathname.startsWith("/PenaltyCertification") ||
                     location.pathname.startsWith("/notice") ||
                     location.pathname.startsWith("/help") ||
                     location.pathname.startsWith("/terms") ||
                     location.pathname.startsWith("/privacy") ||
                     location.pathname.startsWith("/penaltyupload");

  return (
    <>
      {!hideHeader && <GuideHeader />}
      {children}
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <LayoutWithHeader>
        <Routes>
          <Route path="/" element={<div>메인화면입니모</div>} />
          <Route path="/cmpguide" element={<CmpGuide />} />
          <Route path="/cssGuide" element={<CssGuide />} />
          <Route path="/pubGuide" element={<PubGuide />} />
          <Route path="/frontGuide" element={<FrontGuide />} />
          {/* 여기서부터 페이지 */}
          <Route path="/additRegister" element={<SignUp />} />
          <Route path="/topic-select" element={<TopicSelect mode="group-topic" />} />
          <Route path="/groupdetailguide" element={<GroupDetail />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/todolist" element={<TodoListPage />} />
          <Route path="/penalty" element={<Penalty />} />
          <Route path="/groupcreateform" element={<GroupCreateForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/groupmissionform" element={<GroupMissionForm />} />
          <Route path="/groupmanage" element={<GroupManagement />} />
          <Route path="/groupsearch" element={<GroupSearch />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/group" element={<Group />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/penaltyupload" element={<PenaltyUpload />} />
          <Route path="/penaltycertification" element={<PenaltyCertification />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </LayoutWithHeader>
    </BrowserRouter>
  );
};

export default Router;
