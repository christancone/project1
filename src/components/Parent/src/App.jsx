import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Childinfo from './Pages/Childinfo';
import ChildStatus from './Pages/ChildStatus';
import Dashboard from './Pages/Dashboard';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LeaveNote from './Pages/LeaveNote';
import Chat from './Pages/Chat';
import Attendee from './Pages/Attendee';

function Parent() {
  return (
    <>
      <Router>
        <div className="app">
          <Navbar />
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendee" element={<Attendee />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/leaveNote" element={<LeaveNote />} />
              <Route path="/childStatus" element={<ChildStatus />} />
              <Route path="/childinfo" element={<Childinfo />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default Parent;