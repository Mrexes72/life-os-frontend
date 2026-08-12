import { useState, useEffect } from "react"
import { habitService } from "./services/habitService"
import type { Habit } from "./services/habitService"
import { HabitListe } from "./components/habits/HabitListe"
import { MeetingRoomList } from "./components/meetingrooms/MeetingRoomList"
import { CreateHabitForm } from "./components/habits/CreateHabitForm"
import { CreateMeetingRoomForm } from "./components/meetingrooms/CreateMeetingRoomForm"

function App() {
  const [habits, setHabits] = useState<Habit[]>([])

  useEffect(() => {
    habitService.getAll().then(setHabits)
  }, [])

  const handeleHabitCreated = (newHabit: Habit) => {
    setHabits([...habits, newHabit])
  }

  return (
    <div>
      <h1>Life OS</h1>
      <HabitListe habits={habits} />
      <CreateHabitForm onHabitCreated={handeleHabitCreated} />
      <MeetingRoomList />
      <CreateMeetingRoomForm />
    </div>
  )
}

export default App