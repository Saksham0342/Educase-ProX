import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col justify-end h-full">
      <h1 className="text-2xl font-bold mb-1">Welcome to PopX</h1>
      <p className="text-gray-500 text-sm mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>

      <Link to="/register" className="bg-purple-600 text-white text-center py-2 rounded-md mb-3">
        Create Account
      </Link>
      <Link to="/login" className="bg-purple-100 text-purple-600 text-center py-2 rounded-md">
        Already Registered? Login
      </Link>
    </div>
  );
}
