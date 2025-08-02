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
import AuthGuard from "@/components/route/AuthGuard";

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
                     location.pathname.startsWith("/penaltyupload")||
                     location.pathname.startsWith("/penalty-select") ||
                      location.pathname.startsWith("/profile-topic") ||
                      location.pathname.startsWith("/study-topic") ||
                      location.pathname.startsWith("/my-topic") ||
                      location.pathname.startsWith("/group-select") ;

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
          {/* 로그인 없이 화면 보고 싶으면 얘네 주석 처리하세요 */}
          {/* <Route path="/groupdetailguide" element={<AuthGuard><GroupDetail /></AuthGuard>} />
          <Route path="/main" element={<AuthGuard><MainPage /></AuthGuard>} />
          <Route path="/todolist" element={<AuthGuard><TodoListPage /></AuthGuard>} />
          <Route path="/penalty" element={<AuthGuard><Penalty /></AuthGuard>} />
          <Route path="/groupcreateform" element={<AuthGuard><GroupCreateForm /></AuthGuard>} />
          <Route path="/mypage" element={<AuthGuard><MyPage /></AuthGuard>} />
          <Route path="/groupmissionform" element={<AuthGuard><GroupMissionForm /></AuthGuard>} />
          <Route path="/groupmanage" element={<AuthGuard><GroupManagement /></AuthGuard>} />
          <Route path="/groupsearch" element={<AuthGuard><GroupSearch /></AuthGuard>} />
          <Route path="/group" element={<AuthGuard><Group /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="/penaltyupload" element={<AuthGuard><PenaltyUpload /></AuthGuard>} />
          <Route path="/penaltycertification" element={<AuthGuard><PenaltyCertification /></AuthGuard>} />
          <Route path="/notice" element={<AuthGuard><NoticePage /></AuthGuard>} />
          <Route path="/help" element={<AuthGuard><HelpPage /></AuthGuard>} />
          <Route path="/terms" element={<AuthGuard><TermsPage /></AuthGuard>} />
          <Route path="/privacy" element={<AuthGuard><PrivacyPage /></AuthGuard>} /> */}
          {/* 얘넨 냅두시고 */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/additRegister" element={<SignUp />} />
          

        
          <Route path="/my-topic" element={<TopicSelect mode="signup" />} />
          <Route path="/profile-topic" element={<TopicSelect mode="profile" />} />
          <Route path="/study-topic" element={<TopicSelect mode="study-topic" />} />
          <Route path="/my-topic" element={<TopicSelect mode="signup" />} />
          <Route path="/profile-topic" element={<TopicSelect mode="profile" />} />
          <Route path="/penalty-select" element={<TopicSelect mode="penalty-topic" />} />
          <Route path="/group-select" element={<TopicSelect mode="group-topic" />} />

          {/* 얘네 주석 해제하세요 */}
          {/* <Route path="/groupdetailguide" element={<GroupDetail />} /> */}
          <Route path="/group/:gid" element={<GroupDetail />} />
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
