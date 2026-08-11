import { useState, useEffect } from "react"
import { habitService } from "../../services/habitService"
import type { Habit } from "../../services/habitService"


export function HabitListe() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    habitService.getAll()
      .then((data) => {
        setHabits(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Kunne ikke hente vaner. Prøv igjen senere.")
        console.error("Feil ved henting av vaner:", error)
        setIsLoading(false)
      })
  }, []);

  if (isLoading) {
    return <p>Laster dine habits...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}