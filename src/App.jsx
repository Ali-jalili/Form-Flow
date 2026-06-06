/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FormBuilderPage from "./pages/FormBuilderPage";
import PublicFormPage from "./pages/PublicFormPage";
import ResponsesPage from "./pages/ResponsesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./features/Auth/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/builder/:formId" element={<FormBuilderPage />} />
          <Route path="/form/:publicId" element={<PublicFormPage />} />
          <Route path="/responses/:formId" element={<ResponsesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<div> NotFoundPage </div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
