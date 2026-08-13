import { useState } from 'react'
import { meetingRoomService, type MeetingRoom } from '../../services/meetingRoomService'

interface Props {
  onMeetingRoomCreated: (meetingRoom: MeetingRoom) => void
}

export function CreateMeetingRoomForm({ onMeetingRoomCreated }: Props) {
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [numberOfSeats, setNumberOfSeats] = useState<number>(0)
  const [hourlyRate, setHourlyRate] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const newMeetingRoom = await meetingRoomService.create({ name, description, numberOfSeats, hourlyRate})
      // Handle successful creation: reset form
      onMeetingRoomCreated(newMeetingRoom)
      setName("")
      setDescription("")
      setNumberOfSeats(0)
      setHourlyRate(0)
    } catch (err) {
      setError("Kunne ikke opprette møterom. Prøv igjenn senere.")
    }
  }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input 
          type="text" 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input 
          type="number"
          id="capacity"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
          required
          />
        </div>
        <div>
          <label htmlFor="hourlyRate">Hourly rate:</label>
          <input 
          type="number"
          id="hourlyRate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(parseFloat(e.target.value))} 
          required
          />
        </div>
        {error && <div>Error: {error}</div>}
        <button type="submit">Create Meeting Room</button>
      </form>
    )
  }
