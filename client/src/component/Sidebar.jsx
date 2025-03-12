import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const { id: activeRoom } = useParams(); // Get the current room ID from URL

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("http://localhost:3000/rooms", { credentials: "include" });
        // const res = await fetch("http://localhost:3000/rooms", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    }
    fetchRooms();
  }, []);

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Your Rooms</h2>
      <div className="flex-1 overflow-y-auto space-y-2 text-white-900">
        {rooms.map((room) => (
          <Link
            key={room.roomID}
            to={`/chat/${room.roomID}`}
            className={`block p-3 rounded-lg ${
              activeRoom === room.roomID ? "bg-indigo-600" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {room.name || room.roomID}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
