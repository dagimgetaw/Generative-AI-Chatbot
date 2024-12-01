import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Signup from "./components/Join/Signup.jsx";
import Login from "./components/Join/Login.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
