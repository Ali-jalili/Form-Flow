/** @format */

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../app/router/ProtectedRoute";
import Spinner from "../../components/ui/Spinner";

const HomePage = lazy(() => import("../../pages/HomePage"));
const DashboardPage = lazy(() => import("../../pages/DashboardPage"));
const FormBuilderPage = lazy(() => import("../../pages/FormBuilderPage"));
const PublicFormPage = lazy(() => import("../../pages/PublicFormPage"));
const ResponsesPage = lazy(() => import("../../pages/ResponsesPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const SignupPage = lazy(() => import("../../pages/SignupPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
