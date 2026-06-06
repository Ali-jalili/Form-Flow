/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FormBuilderPage from "./pages/FormBuilderPage";
import PublicFormPage from "./pages/PublicFormPage";
import ResponsesPage from "./pages/ResponsesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./features/Auth/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/Auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder/:formId"
            element={
              <ProtectedRoute>
                <FormBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/form/:publicId" element={<PublicFormPage />} />
          <Route
            path="/responses/:formId"
            element={
              <ProtectedRoute>
                <ResponsesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<div> NotFoundPage </div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
