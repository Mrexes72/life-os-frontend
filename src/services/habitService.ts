import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

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
  }
}