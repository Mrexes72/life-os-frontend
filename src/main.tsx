import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { HabitListe } from './components/habits/HabitListe'
import { CreateHabitForm } from './components/habits/CreateHabitForm'
import { MeetingRoomList } from './components/meetingrooms/MeetingRoomList'
import { CreateMeetingRoomForm } from './components/meetingrooms/CreateMeetingRoomForm'
import './index.css'

const Hjem = () => <h2>Velkommen til Habit Tracker!</h2>
const Om_oss = () => <h2>Om denne appen</h2>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Hjem />} />
          <Route path="om" element={<Om_oss />} />
          {/* Props fjernes herfra fordi vi bruker Outlet Context i stedet */}
          <Route path='habits' element={<HabitListe />} />
          <Route path="habitsCreated" element={<CreateHabitForm />} />
          <Route path="meetingroom" element={<MeetingRoomList />} />
          <Route path="meetingroomCreated" element={<CreateMeetingRoomForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
