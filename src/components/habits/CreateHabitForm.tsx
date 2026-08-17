import { useState } from "react"
import { habitService } from "../../services/habitService"
import type { Habit } from "../../services/habitService"
import { useOutletContext } from "react-router-dom"

interface Props {
  handleHabitCreated: (habit: Habit) => void
}

export function CreateHabitForm() {
  const {handleHabitCreated} = useOutletContext<Props>();
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [streakDays, setStreakDays] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const newHabit = await habitService.create({ name, description, streakDays })
      handleHabitCreated(newHabit)  // 👈 fortell App at en ny habit ble opprettet
      setName("")
      setDescription("")
      setStreakDays(0)
    } catch (err) {
      setError("Kunne ikke opprette vane. Prøv igjen senere.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
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
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="streakDays">Streak Days:</label>
        <input
          type="number"
          id="streakDays"
          value={streakDays}
          onChange={(e) => setStreakDays(parseInt(e.target.value) || 0)}
          required
        />
      </div>
      {error && <div>Error: {error}</div>}
      <button type="submit">Create Habit</button>
    </form>
  )
}