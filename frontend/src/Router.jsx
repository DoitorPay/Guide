// Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CmpGuide from "@/guide/cmpGuide";
import CssGuide from "@/guide/cssGuide";
import PubGuide from "@/guide/pubGuide";
import FrontGuide from "@/guide/frontGuide";
import GuideHeader from "@/components/guideHeader";
import Login from "@/pages/login";

const Home = () => <div>메인화면입니모</div>;

const Router = () => {
  return (
    <BrowserRouter>
      <GuideHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cmpguide" element={<CmpGuide />} />
        <Route path="/cssGuide" element={<CssGuide />} />
        <Route path="/pubGuide" element={<PubGuide />} />
        <Route path="/frontGuide" element={<FrontGuide />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
