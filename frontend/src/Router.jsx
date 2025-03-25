// Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CmpGuide from "@/guide/cmpGuide";
import CssGuide from "@/guide/cssGuide";
import PubGuide from "@/guide/pubGuide";
import FrontGuide from "@/guide/frontGuide";
import Header from "@/components/header";

const Home = () => <div>메인화면입니모</div>;

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cmpguide" element={<CmpGuide />} />
        <Route path="/cssGuide" element={<CssGuide />} />
        <Route path="/pubGuide" element={<PubGuide />} />
        <Route path="/frontGuide" element={<FrontGuide />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
