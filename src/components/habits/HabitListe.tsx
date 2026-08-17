import { useState } from "react"
import type { Habit } from "../../services/habitService"
import { habitService } from "../../services/habitService"
import { useOutletContext } from "react-router-dom"

interface Props {
  habits: Habit[],
  handleHabitDeleted: (id: number) => void;
}

export function HabitListe() {
  const { habits, handleHabitDeleted } = useOutletContext<Props>();
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (id: number) => {
    try {
      await habitService.remove(id)
      handleHabitDeleted(id)
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