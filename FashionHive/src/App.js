import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters.jsx";
import AdminRouters from "./Routers/AdminRouters.jsx";
import { Toaster } from "react-hot-toast";
import ProtectAdmin from "./Routers/ProtectAdmin.jsx";
import LoginPrompt from "./customer/components/LoginPrompCart/LoginPrompt.jsx";


function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <LoginPrompt />
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
        <Route  element={<ProtectAdmin/>}>
          <Route path="/admin/*" element={<AdminRouters />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
