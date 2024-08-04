import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Childinfo from './Pages/Childinfo';
import ChildStatus from './Pages/ChildStatus';
import Dashboard from './Pages/Dashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
              <Route path="/" element={<Attendee />} />
              {/* <Route path="/" element={<Chat />} /> */}
              {/* <Route path="/" element={<LeaveNote />} /> */}
              {/* <Route path="/" element={<ChildStatus />} /> */}
              {/* <Route path="/" element={<Dashboard />} /> */}
              {/* <Route path="/" element={<Childinfo />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default Parent;