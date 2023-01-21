import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
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
import LiveStream from "./dashboard/pages/LiveStream";
import MeetingRoom from "./dashboard/pages/meeting-room/MeetingRoom";
import MeetingRoomSummery from "./dashboard/pages/meeting-room/MeetingRoomSummery";

import Profile from "./dashboard/pages/Profile";
import Settings from "./dashboard/pages/Settings";
import Payment from "./authentication/account_creation/Payment";
import "react-loading-skeleton/dist/skeleton.css";
import Notifications from "./dashboard/communication/Notifications";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            //----------------Dashboard Routes--------------------------------//
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/meeting-room"
              element={
                <PrivateRoute>
                  <MeetingRoomSummery />
                </PrivateRoute>
              }
            />
            <Route
              path="/meeting-room/:id"
              element={
                <PrivateRoute>
                  <MeetingRoom />
                </PrivateRoute>
              }
            />
            <Route
              path="/content"
              element={
                <PrivateRoute>
                  <Content />
                </PrivateRoute>
              }
            />
            <Route
              path="/live-streams"
              element={
                <PrivateRoute>
                  <LiveStream />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            //----------------Authentication Routes---------------------------//
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account-creation" element={<AccountCreation />} style={{ maxWidth: "700px" }} />
            <Route path="/symptom-assessment" element={<SymptomAssessment />} style={{ maxWidth: "1000px" }} />
            <Route path="/symptom-cause" element={<SymptomCause />} style={{ maxWidth: "1000px" }} />
            <Route path="/avatar-upload" element={<AvatarUpload />} style={{ maxWidth: "1000px" }} />
            <Route path="/payment-details" element={<PaymentDetails />} style={{ maxWidth: "900px" }} />
          </Routes>
        </AuthProvider>
      </Provider>
    </Router>
  );
}

export default App;

// <Container
// className="d-flex align-items-center justify-content-center"
// style={{ minHeight: "100vh" }}
// >
// <div className="w-100" style={{ maxWidth: "500px" }}>

// </div>
//     </Container>

// function AuthStack() {
//   return (
//     <Routes>
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       <Route
//         path="/account-creation"
//         element={<AccountCreation />}
//         style={{ maxWidth: "700px" }}
//       />
//       <Route
//         path="/symptom-assessment"
//         element={<SymptomAssessment />}
//         style={{ maxWidth: "1000px" }}
//       />
//       <Route
//         path="/symptom-cause"
//         element={<SymptomCause />}
//         style={{ maxWidth: "1000px" }}
//       />
//       <Route
//         path="/avatar-upload"
//         element={<AvatarUpload />}
//         style={{ maxWidth: "1000px" }}
//       />
//       <Route
//         path="/payment-details"
//         element={<PaymentDetails />}
//         style={{ maxWidth: "900px" }}
//       />
//     </Routes>
//   );
// }

// function MainStack() {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       />
//     </Routes>
//   );
// }
