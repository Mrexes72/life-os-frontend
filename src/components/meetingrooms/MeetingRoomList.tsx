import { useState } from "react"
import { meetingRoomService, type MeetingRoom } from "../../services/meetingRoomService"
import { useOutletContext } from "react-router-dom"

interface Props {
  meetingRooms: MeetingRoom[]
  handleMeetingRoomDeleted: (id:number) => void
}

export function MeetingRoomList() {
  const { meetingRooms, handleMeetingRoomDeleted } =  useOutletContext<Props>();
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (id:number) => {
    try {
      await meetingRoomService.remove(id)
      handleMeetingRoomDeleted(id)
    } catch (err) {
      setError("Kunne ikke slette møterom. Prøv igjenn senere")
    }
  }
  return (
    <div>
      <h2>Meeting Rooms</h2>
      <ul>
        {meetingRooms.map((room) => (
          <li key={room.id}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Capacity: {room.numberOfSeats}</p>
            <p>Hourly Rate: {room.hourlyRate.toFixed(2)}</p>
            {error && <div>Error: {error}</div>}
            <button onClick={() => handleDelete(room.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
