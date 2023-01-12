import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import AccountCreation from "./authentication/account_creation/AccountCreation";
import SymptomAssessment from "./authentication/account_creation/SymptomAssessment";
import SymptomCause from "./authentication/account_creation/SymtomCause";
import AvatarUpload from "./authentication/account_creation/AvatarUpload";
import PaymentDetails from "./authentication/account_creation/PaymentDetails";

import Dashboard from "./dashboard/pages/Dashboard";
import Content from "./dashboard/pages/Content";
import ExtraProducts from "./dashboard/pages/ExtraProducts";
import MeetingRoom from "./dashboard/pages/MeetingRoom";
import Profile from "./dashboard/pages/Profile";
import Settings from "./dashboard/pages/Settings";
import Payment from "./authentication/account_creation/Payment";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route
                path="/account-creation"
                element={<AccountCreation />}
                style={{ maxWidth: "700px" }}
              />
              <Route
                path="/symptom-assessment"
                element={<SymptomAssessment />}
                style={{ maxWidth: "1000px" }}
              />
              <Route
                path="/symptom-cause"
                element={<SymptomCause />}
                style={{ maxWidth: "1000px" }}
              />
              <Route
                path="/avatar-upload"
                element={<AvatarUpload />}
                style={{ maxWidth: "1000px" }}
              />
              <Route
                path="/payment"
                element={<Payment />}
                
              />
              <Route
                path="/payment-details"
                element={<PaymentDetails />}
                style={{ maxWidth: "900px" }}
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
