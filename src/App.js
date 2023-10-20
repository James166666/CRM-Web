import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadLogInPage from "./pages/LogIn";
import LoadSignPage from "./pages/SignUp";
import LoadForgotPage from "./pages/ForgotPassword";
import LoadResetPage from "./pages/ResetPassword";
import LoadDashboardPage from "./pages/DashnoardPage/Dashboard";
import Contacts from './pages/ContactsPage/Contact';
import ContactDetail from  './pages/ContactsPage/ContactsDetails'
import LoadAddContactPage from  './pages/ContactsPage/AddContactManually'
import LoadProfilePage from "./pages/ProfilePage/Profile";
import MyCalendar from "./pages/CalendarPage/myCalendar";
import TrelloBoard from "./pages/TrelloBoardPage/TrelloBoard";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<LoadLogInPage />} />
        <Route path="/login" element={<LoadLogInPage />} />
        <Route path="/signup" element={<LoadSignPage />} />
        <Route path="/forgot" element={<LoadForgotPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/addContact" element={<LoadAddContactPage />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
        <Route path="/profile" element={<LoadProfilePage />} /> 
        <Route path="/reset" element={<LoadResetPage />} /> 
        <Route path="/calendar" element={<MyCalendar />} /> 
        <Route path="/trello-board" element={<TrelloBoard />} />
        <Route path="/dashboard" element={<LoadDashboardPage />} />
       
      </Routes>
    </Router> 

    </div>
  );
}

export default App;


