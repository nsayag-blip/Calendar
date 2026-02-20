import { useState } from 'react'
import type { Appointment } from '../types/index.ts'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Checkup',
      start: '2026-02-12T10:00:00',
      patient: 'John Doe',
      room: '101',
      type: 'Routine'
    },
    {
      id: '2',
      title: 'Consultation',
      start: '2026-02-13T13:00:00',
      patient: 'Jane Smith',
      room: '202',
      type: 'Urgent'
    }
  ])

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment])
  }

  const updateAppointment = (updated: Appointment) => {
    setAppointments(prev =>
      prev.map(a => a.id === updated.id ? updated : a)
    )
  }

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id))
  }

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  }
}
