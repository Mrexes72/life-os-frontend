import { useState } from "react"
import type { Habit } from "../../services/habitService"
import { habitService } from "../../services/habitService"

interface Props {
  habits: Habit[],
  onHabitDeleted: (id: number) => void
}

export function HabitListe({ habits, onHabitDeleted }: Props) {
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (id: number) => {
    try {
      await habitService.remove(id)
      onHabitDeleted(id)
    } catch (err) {
        setError("Kunne ikke slette vanen. Prøv igjenn senere")
    }
  } 
  return (
    <div>
      <h2>Mine Vaner</h2>
      {habits.length === 0 ? (
        <p>Du har ikke lagt til noen vaner enda.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>
              <strong>{habit.name}</strong> – 🔥 {habit.streakDays} dager
              {error && <div>Error: {error}</div>}
              <button onClick={() =>handleDelete(habit.id)} className="btn-danger">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}