import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import PsotUpdate from "./pages/PsotUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/update/:id" element={<PsotUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
