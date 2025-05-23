import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-[360px] bg-white shadow-lg rounded-lg p-6 min-h-[600px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
