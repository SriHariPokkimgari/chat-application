import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Join from "../chat/Join";

const Home = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    userId: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  useEffect(() => {
    console.log(Cookies.get("token"));
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/profile",
          "",
          {
            withCredentials: "include",
          }
        );
        setUserData({
          userName: res?.data?.userName,
          email: res?.data?.email,
          userId: res?.data?._id,
        });
      } catch (error) {
        setMessage(error?.response?.data?.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[90vh]">
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold">
              {userData.userName
                ? userData.userName.charAt(0).toUpperCase()
                : "G"}
            </div>

            <h1 className="text-xl font-semibold text-white">
              {userData.userName ? userData.userName : "guest"}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-2 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
        <div className="flex justify-center items-center h-[100%] bg-gray-100">
          {userData.userName && (
            <div className="bg-white shadow-lg w-full p-8 rounded-2xl max-w-md">
              <Join userName={userData.userName} userId={userData.userId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
