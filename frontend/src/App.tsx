import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";

import User from "./components/User";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<Basic />} >
      <Route path="/" element={<User />} />
      
      </Route >
    </Routes>
  );
}

export default App;
