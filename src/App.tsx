import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { habitService } from "./services/habitService"
import { meetingRoomService } from "./services/meetingRoomService"
import type { Habit } from "./services/habitService"
import type { MeetingRoom } from "./services/meetingRoomService"

function App() {
  // HOOKS ER FLYTTET HIT – PÅ INNSIDEN AV KOMPONENTEN
  const [habits, setHabits] = useState<Habit[]>([])
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([])

  useEffect(() => {
    habitService.getAll().then(setHabits)
  }, [])

  useEffect(() => {
    meetingRoomService.getAll().then(setMeetingRooms)
  }, [])

  const handleHabitCreated = (newHabit: Habit) => {
    setHabits([...habits, newHabit])
  }

  const handleHabitDeleted = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const handleMeetingRoomCreated = (newMeetingRoom: MeetingRoom) => {
    setMeetingRooms([...meetingRooms, newMeetingRoom])
  }

  const handleMeetingRoomDeleted = (id: number) => {
    setMeetingRooms(meetingRooms.filter(room => room.id !== id))
  }

  // Siden rutene dine ligger i main.tsx, må vi sende staten og funksjonene 
  // videre ned til undersidene via en "context" i Outlet
  return (
    <div>
      <h1>Life OS</h1>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet context={{ 
          habits, 
          meetingRooms, 
          handleHabitCreated, 
          handleHabitDeleted, 
          handleMeetingRoomCreated, 
          handleMeetingRoomDeleted 
        }} />
      </main>
    </div>
  )
}

export default App
