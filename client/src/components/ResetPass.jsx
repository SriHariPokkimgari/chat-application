import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import Cookies from "js-cookie";
const ResetPass = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [serchParams] = useSearchParams();
  const navigate = useNavigate();
  //const token = serchParams.get("reset-token");

  const handleReset = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (formData.password === formData.confirmPassword) {
      //Cookies.set("reset-token", token);
      try {
        const res = await axios.post(
          `http://localhost:8000/api/auth/reset-password`,
          formData,
          {
            withCredentials: "include",
          }
        );
        setMessage(res?.data?.message);
        setIsloading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        setMessage(
          error?.response?.data?.error?.message || error?.response?.data?.error
        );
        setIsloading(false);
      }
    } else {
      setMessage("password doesn't match");
      setIsloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-medium text-center mb-6">
          Reset password
        </h2>
        <form onSubmit={handleReset} className="space-y-6">
          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="confirm password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:cursor-pointer hover:bg-blue-700  duration-300 ease-in mb-4"
          >
            {isLoading ? "resetting" : "reset"}
          </button>
        </form>
        <div className="w-full mt-2 text-center font-medium">
          {message === "password changed" ? (
            <p className="text-green-500 text-lg text-shadow-md">{message}</p>
          ) : (
            <p className="text-red-500 text-lg text-shadow-md">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
