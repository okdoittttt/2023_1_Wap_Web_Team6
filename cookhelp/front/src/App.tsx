import React, { useState, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Recipe from "./pages/Recipe";
import RecipeList from "./pages/RecipeList";
import RecipeRegister from "./pages/RecipeRegister";
import BoardList from "./pages/BoardList";
import BoardRegister from "./pages/BoardRegister";
import BoardModify from "./pages/BoardModify";
import Board from "./pages/Board";
import Mypage from "./pages/Mypage";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeModify from "./pages/RecipeModify";

function App() {
  const NotFound = () => {
    return <h1>잘못된 주소 접근</h1>;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/myPage/:id" element={<Mypage />} />
          <Route path="/recipe_list/:keyword?" element={<RecipeList />} />
          <Route path="/recipe_register" element={<RecipeRegister />} />
          <Route path="/recipe_modify" element={<RecipeModify />} />
          <Route path="/recipe_detail/:recipe_idx" element={<RecipeDetail />} />
          <Route path="/recipe/:recipe_idx" element={<Recipe />} />
          <Route path="/board_list/:keyword?" element={<BoardList />} />
          <Route path="/board_register" element={<BoardRegister />} />
          <Route path="/board_modify" element={<BoardModify />} />
          <Route path="/board/:board_idx?" element={<Board />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
