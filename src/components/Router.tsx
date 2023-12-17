import React from "react";
import { Routes, Route } from "react-router-dom";
import AppPage from "../pages/users/app/AppPage";
import ReviewPage from "../pages/users/app/ReviewPage";
import AppRegister from "../pages/users/app/AppRegister";
import Main from "../pages/users/app/Main";
import RankingPage from "../pages/users/ranking/RankingPage";
import UserProfitPage from "../pages/users/ranking/UserProfitPage";

const Router = (props: any) => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/AppPage' element={<AppPage />} />
            <Route path='/ReviewPage' element={<ReviewPage />} />
            <Route path='/AppRegister' element={<AppRegister />} />
            <Route path='/RankingPage' element={<RankingPage />} />
            <Route path="/RankingPage/Profit" element={ <UserProfitPage />} />
        </Routes>
    );
};

export default Router;