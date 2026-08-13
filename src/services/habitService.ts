import axios from 'axios'
import { API_URL } from '../config'

export interface Habit {
  id: number
  name: string
  description: string
  streakDays: number
}

export const habitService = {
  getAll: async (): Promise<Habit[]> => {
    const response = await axios.get(`${API_URL}/habits`)
    return response.data
  },

  create: async (habit: Omit<Habit, 'id'>): Promise<Habit> => {
    const response = await axios.post(`${API_URL}/habits`, habit)
    return response.data
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/habits/${id}`)
  }
}