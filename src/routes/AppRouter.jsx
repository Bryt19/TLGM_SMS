import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import UpcomingEvents from '../pages/UpcomingEvents';
import ProtectedContent from '../pages/ProtectedContent';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/events" element={<UpcomingEvents />} />
        <Route path="/protected" element={<ProtectedContent />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
