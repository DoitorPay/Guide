import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CmpGuide from "@/guide/cmpGuide";
import CssGuide from "@/guide/cssGuide";
import PubGuide from "@/guide/pubGuide";
import FrontGuide from "@/guide/frontGuide";
import GuideHeader from "@/components/header/guideHeader";
import Login from "@/pages/login";
import SignUp from "@/pages/SignUp.jsx";
import StudyTopic from "@/pages/studyTopic.jsx";
import GroupDetail from "@/pages/GroupDetail.jsx";
import MainPage from "@/pages/home.jsx";
import TodoListPage from "@/pages/todoList.jsx";
import Penalty from "@/pages/penalty.jsx";
import GroupCreateForm from "@/pages/GroupCreateForm";
import MyPage from "@/pages/myPage";
import GroupMissionForm from "@/pages/GroupMissionForm";
import GroupManagement from "@/pages/GroupManagement";

const LayoutWithHeader = ({ children }) => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/login") ||
                     location.pathname.startsWith("/additRegister") ||
                     location.pathname.startsWith("/studytopic") ||
                     location.pathname.startsWith("/groupdetailguide") ||
                     location.pathname.startsWith("/todoList") ||
                     location.pathname.startsWith("/main") ||
                     location.pathname.startsWith("/mypage") ||
                     location.pathname.startsWith("/penalty");

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
          <Route path="/login" element={<Login />} />
          <Route path="/additRegister" element={<SignUp />} />
          <Route path="/studytopic" element={<StudyTopic />} />
          <Route path="/groupdetailguide" element={<GroupDetail />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/todolist" element={<TodoListPage />} />
          <Route path="/penalty" element={<Penalty />} />
          <Route path="/groupcreateform" element={<GroupCreateForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/groupmissionform" element={<GroupMissionForm />} />
          <Route path="/groupmanage" element={<GroupManagement />} />
        </Routes>
      </LayoutWithHeader>
    </BrowserRouter>
  );
};

export default Router;
