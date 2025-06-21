import { useState } from "react";
import { Link } from "react-router";

const Join = ({ userName, userId }) => {
  const [roomName, setRoomName] = useState("");

  return (
    <div>
      <h2 className="font-light text-center text-2xl">Join room</h2>
      <input
        placeholder="room id"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
      />
      <Link
        onClick={(e) => (!roomName ? e.preventDefault() : null)}
        to={`/chat?username=${userName}&userid=${userId}&roomname=${roomName}`}
      >
        <button
          type="submit"
          className="w-full bg-blue-600 py-1 rounded-lg text-white hover:cursor-pointer hover:bg-blue-700 ease-in duration-200"
        >
          Join
        </button>
      </Link>
    </div>
  );
};

export default Join;
