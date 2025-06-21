import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import Home from "./components/Home";
import SocketUI from "./chat/SocketUI";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<SocketUI />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
