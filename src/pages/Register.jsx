import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "no",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validate only when field changes AND it's touched
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [formData]);

  const validate = () => {
    const newErrors = {};

    if (touched.fullName) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (formData.fullName.length < 3) {
        newErrors.fullName = "Full name must be at least 3 characters";
      }
    }

    if (touched.phone) {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
    }

    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is not valid";
      }
    }

    if (touched.password) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (touched.companyName) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      password: true,
      companyName: true,
    });

    if (!validate()) return;

    setUser(formData);
    localStorage.setItem("popx-user", JSON.stringify(formData));
    navigate("/profile");

  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Create your PopX account</h2>
      <p className="text-sm text-gray-500 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={setFormData}
          onBlur={handleBlur}
          error={errors.fullName}
        />

        <Input
          label="Phone Number"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={setFormData}
          onBlur={handleBlur}
          error={errors.phone}
        />

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

        <Input
          label="Company Name"
          name="companyName"
          placeholder="Enter company name"
          value={formData.companyName}
          onChange={setFormData}
          onBlur={handleBlur}
          error={errors.companyName}
        />

        {/* Are you an agency? */}
        <div>
          <label className="text-sm font-medium text-purple-600 block mb-1">
            Are you an agency?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={formData.isAgency === "yes"}
                onChange={(e) =>
                  setFormData({ ...formData, isAgency: e.target.value })
                }
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={formData.isAgency === "no"}
                onChange={(e) =>
                  setFormData({ ...formData, isAgency: e.target.value })
                }
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md mt-6 font-medium bg-purple-600 text-white hover:bg-purple-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

// Input Component with error display and show/hide toggle
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
