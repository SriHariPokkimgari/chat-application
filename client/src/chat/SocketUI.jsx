import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import axios from "axios";

const SocketUI = () => {
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    userId: "",
    roomName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userName = params.get("username");
    const userId = params.get("userid");
    const roomName = params.get("roomname");
    setUserData({ userName, userId, roomName });

    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/chat/${roomName}`
        );
        setMessages(res?.data?.messages);
      } catch (error) {
        console.log(error);
      }
    };

    socketRef.current = io("http://localhost:8000", {
      auth: {
        userName,
        userId,
        roomName,
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.emit("join", { userName, userId, roomName }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fetchMessage();
    return () => {
      socketRef.current.off();
      socketRef.current.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    socketRef.current.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.off("message");
    };
  }, []);

  function handleSend(e) {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit(
        "sendMessage",
        { message, userName: userData.userName, roomId: userData.roomName },
        () => setMessage("")
      );
    }
  }

  function handleExit() {
    socketRef.current.emit("user_disconnect");
    navigate("/home");
  }

  return (
    <>
      <div className="flex flex-col  h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Chat Room</h2>

          <button
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-lg text-white hover:cursor-pointer transition-colors duration-200"
          >
            Exit
          </button>
        </div>

        <div className="flex-1 overflow-y-auto  p-4 space-y-4">
          {messages.map((msg, i) =>
            userData.userName === msg.userName ? (
              <div key={i} className="flex justify-end">
                <div className="bg-blue-500 max-w-xs lg:max-w-md px-4 py-2 rounded-xl rounded-tr-none shadow-md">
                  <p className="text-white">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={i}>
                {msg.userName === "Admin" ? (
                  userData.userName === msg?.joinUser ? null : (
                    <div key={i} className="flex justify-start">
                      <div className="bg-white max-w-xs lg:max-w-md px-4 py-3 rounded-xl rounded-tl-none shadow-md border border-gray-100">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium shadow-inner">
                            {msg?.userName?.charAt(0)?.toUpperCase()}
                          </span>
                          <p className="text-sm font-medium text-gray-700">
                            {msg.userName}
                          </p>
                        </div>
                        <p className="text-gray-800 text-sm pl-8">{msg.text}</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="bg-white max-w-xs lg:max-w-md px-4 py-3 rounded-xl rounded-tl-none shadow-md border border-gray-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium shadow-inner">
                          {msg?.userName?.charAt(0)?.toUpperCase()}
                        </span>
                        <p className="text-sm font-medium text-gray-700">
                          {msg.userName}
                        </p>
                      </div>
                      <p className="text-gray-800 text-sm pl-8">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <form
          onSubmit={handleSend}
          className="bg-white border-t border-gray-200 p-3 flex items-center space-x-2"
        >
          <input
            placeholder="type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 hover:cursor-pointer"
          >
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default SocketUI;
