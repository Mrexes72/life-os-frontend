import { useState } from "react"
import { habitService } from "../../services/habitService"

interface Props {
  onHabitDeleted: (id:number) => void
}