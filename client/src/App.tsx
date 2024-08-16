import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Dashboard, MyBooks } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mybooks" element={<MyBooks />} />
      </Routes>
    </Router>
  );
};

export default App;
