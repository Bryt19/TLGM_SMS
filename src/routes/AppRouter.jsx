import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RemindMe from '../pages/Register';
import TermsOfService from '../pages/TermsOfService';
import UpcomingEvents from '../pages/UpcomingEvents';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reminder" element={<RemindMe />} />
        <Route path="/events" element={<UpcomingEvents />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
