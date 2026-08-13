import { useState, useEffect } from "react"
import { habitService } from "./services/habitService"
import type { Habit } from "./services/habitService"
import { HabitListe } from "./components/habits/HabitListe"
import { meetingRoomService } from "./services/meetingRoomService"
import type { MeetingRoom } from "./services/meetingRoomService"
import { MeetingRoomList } from "./components/meetingrooms/MeetingRoomList"
import { CreateHabitForm } from "./components/habits/CreateHabitForm"
import { CreateMeetingRoomForm } from "./components/meetingrooms/CreateMeetingRoomForm"

function App() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [meetingRooms, setMeetingRooms] =  useState<MeetingRoom[]>([])

  useEffect(() => {
    habitService.getAll().then(setHabits)
  }, [])

  useEffect(() => {
    meetingRoomService.getAll().then(setMeetingRooms)
  }, [])

  const handeleHabitCreated = (newHabit: Habit) => {
    setHabits([...habits, newHabit])
  }

  const handleHabitDeleted = (id:number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const handleMeetingRoomCreated = (newMeetingRoom: MeetingRoom) => {
    setMeetingRooms([...meetingRooms, newMeetingRoom])
  }

  const handleMeetingRoomDeleted = (id:number) => {
    setMeetingRooms(meetingRooms.filter(meetingRooms => meetingRooms.id !== id))
  }

  return (
    <div>
      <h1>Life OS</h1>
      <HabitListe habits={habits} onHabitDeleted={handleHabitDeleted}/>
      <CreateHabitForm onHabitCreated={handeleHabitCreated} />
      <MeetingRoomList meetingRooms={meetingRooms} onMeetingRoomDeleted={handleMeetingRoomDeleted} />
      <CreateMeetingRoomForm onMeetingRoomCreated={handleMeetingRoomCreated}/>
    </div>
  )
}

export default App