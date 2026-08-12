import { useState, useEffect } from "react"
import { meetingRoomService } from "../../services/meetingRoomService"
import type { MeetingRoom } from "../../services/meetingRoomService"

export function MeetingRoomList() {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    meetingRoomService.getAll()
      .then((data) => {
        setMeetingRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Kunne ikke hente møterom. Prøv igjen senere.");
        console.error("Feil ved henting av møterom:", err);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Meeting Rooms</h2>
      <ul>
        {meetingRooms.map((room) => (
          <li key={room.id}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Hourly Rate: {room.hourlyRate.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}