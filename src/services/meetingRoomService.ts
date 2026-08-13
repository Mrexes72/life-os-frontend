import axios from 'axios'
import { API_URL } from '../config'

export interface MeetingRoom {
  id: number
  name: string
  description: string
  numberOfSeats: number
  hourlyRate: number
}

export const meetingRoomService = {
  getAll: async (): Promise<MeetingRoom[]> => {
    const response = await axios.get(`${API_URL}/meeting-rooms`)
    return response.data
  },

  create: async (meetingRoom: Omit<MeetingRoom, 'id'>): Promise<MeetingRoom> => {
    const response = await axios.post(`${API_URL}/meeting-rooms`, meetingRoom)
    return response.data
  },

  remove: async (id:number): Promise<void> => {
    await axios.delete(`${API_URL}/meeting-rooms/${id}`)
  }
}