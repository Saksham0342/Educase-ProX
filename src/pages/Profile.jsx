// src/pages/Profile.jsx
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        No user data available. Please register or login first.
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("popx-user");
    navigate("/login");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.fullName}</h2>

      <div className="space-y-4">
        <Field label="Full Name" value={user.fullName} />
        <Field label="Phone Number" value={user.phone} />
        <Field label="Email Address" value={user.email} />
        <Field label="Password" value={"*".repeat(user.password.length)} />
        <Field label="Company Name" value={user.companyName} />
        <Field label="Are you an agency?" value={user.isAgency === "yes" ? "Yes" : "No"} />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Reusable field component
function Field({ label, value }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}
