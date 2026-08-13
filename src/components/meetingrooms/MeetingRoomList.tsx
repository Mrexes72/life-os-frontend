import type { MeetingRoom } from "../../services/meetingRoomService"

interface Props {
  meetingRooms: MeetingRoom[]
}

export function MeetingRoomList({ meetingRooms}: Props) {
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
          </li>
        ))}
      </ul>
    </div>
  )
}
