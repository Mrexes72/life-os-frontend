import { useState } from 'react'
import { meetingRoomService } from '../../services/meetingRoomService'

export function CreateMeetingRoomForm() {
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [capacity, setCapacity] = useState<number>(0)
  const [hourlyRate, setHourlyRate] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    try {
      await meetingRoomService.create({ name, description, capacity, hourlyRate})
      // Handle successful creation: reset form
      setName("")
      setDescription("")
      setCapacity(0)
      setHourlyRate(0)
    } catch (err) {
      setError("Kunne ikke opprette møterom. Prøv igjenn senere.")
      console.error("Feil ved oppretting av møterom:", err)
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
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
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
