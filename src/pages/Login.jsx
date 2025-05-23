import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (touched.password) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [formData]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    if (!validate()) return;

    const savedUser = JSON.parse(localStorage.getItem("popx-user"));

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      setUser(savedUser);
      navigate("/account-settings");
    } else {
      setErrors({
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Sign in to your PopX account</h2>
      <p className="text-sm text-gray-500 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={setFormData}
          onBlur={handleBlur}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={formData.password}
          onChange={setFormData}
          onBlur={handleBlur}
          error={errors.password}
          showToggle
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <button
          type="submit"
          className="w-full py-2 rounded-md mt-6 font-medium bg-purple-600 text-white hover:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  onBlur,
  showToggle,
  showPassword,
  setShowPassword,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-purple-600 block mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, [name]: e.target.value }))
          }
          onBlur={() => onBlur(name)}
          className={`w-full border rounded-md px-3 py-2 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {showToggle && (
          <span
            className="absolute right-3 top-2 cursor-pointer text-sm text-purple-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        )}
      </div>
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
}
