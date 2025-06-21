import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const ForgotPass = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    Cookies.remove("reset-token");
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/forgot-password",
        formData,
        {
          withCredentials: true,
        }
      );

      setMessage(res?.data?.message);
    } catch (error) {
      setMessage(error?.response?.data?.error);
    } finally {
      setFormData({ email: "" });
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8  rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-medium text-center mb-6">
          Forgot password
        </h2>
        <form onSubmit={handleForgot} className="space-y-4">
          <input
            type="email"
            placeholder="enter email"
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 py-1.5 rounded-lg text-white hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in mt-2"
          >
            {isLoading ? "sending..." : "send link"}
          </button>

          <a href="/" className="text-blue-500 text-lg hover:underline">
            login page
          </a>
        </form>
        <div className="w-full text-center mt-4 font-medium">
          {message === "Reset link sent to your mail" ? (
            <p className="text-green-500 text-lg text-shadow-md">{message}</p>
          ) : (
            <p className="text-red-500 text-lg text-shadow-lg">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
