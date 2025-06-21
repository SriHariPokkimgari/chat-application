import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData
      );

      setMessage(res?.data?.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage(error?.response?.data?.error);
    } finally {
      setFormData({ userName: "", email: "", password: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-medium text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            placeholder="username"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            typeof="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in"
          >
            signup
          </button>
        </form>
        <div className="mt-4">
          <a href="/" className="text-blue-700 hover:underline">
            Already have an account
          </a>
        </div>
        <div className="mt-4 w-full text-center font-medium">
          {message ===
          "Creating account successfully completed now you can login!" ? (
            <p className="text-lg text-green-500">{message}</p>
          ) : (
            <p className="text-lg text-red-500">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
