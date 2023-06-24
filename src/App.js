import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ToDoPage from './components/ToDoPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/todolist" element={<ToDoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
