import type { Habit } from "../../services/habitService"

interface Props {
  habits: Habit[]
}

export function HabitListe({ habits }: Props) {
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}