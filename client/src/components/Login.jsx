import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/login", formData, {
        withCredentials: "include",
      });
      navigate("/home");
    } catch (error) {
      setMessage(error?.response?.data?.error);
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-medium text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <a
              href="http://localhost:8000/api/auth/google"
              className="w-full  bg-white border border-gray-300 text-gray-700 py-2 my-4 rounded font-medium flex items-center justify-center  hover:bg-gray-50"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </a>
          </div>
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
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <button
            type="submit"
            className="w-full bg-blue-600 rounded-lg py-1.5 text-white hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in "
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-blue-600">
          <a href="/forgot-password" className="hover:underline">
            Forgot password
          </a>
          <a href="/signup" className="hover:underline">
            Create a account
          </a>
        </div>
        <div className="mt-4 w-full  text-center text-red-500">
          {message && <p className="font-medium text-lg ">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
