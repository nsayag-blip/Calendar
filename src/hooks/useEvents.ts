import { useState } from 'react'
import type { EventInput } from '@fullcalendar/core'

  export function useEvents() {
        const [events, setEvents] = useState<EventInput[]>([
        {
            id: '1',
            title: 'Checkup',
            start: '2026-02-12T10:00:00',
            extendedProps: {
                patient: 'John Doe',
                room: '101',
                type: 'Routine'
            }
        },
        {
            id: '2',
            title: 'Consultation',
            start: '2026-02-13T13:00:00',
            extendedProps: {
            patient: 'Jane Smith',
            room: '202',
            type: 'Urgent'
            }
        },
        {
            id: '3',
            title: 'Therapy',
            start: '2026-02-14T09:00:00',
            extendedProps: {
            patient: 'Bob Brown',
            room: '303',
            type: 'Routine'
            }
        }
    ])


  const addEvent = (event: EventInput) => {
    setEvents(prev => [...prev, event])
  }

  const updateEvent = (updatedEvent: EventInput) => {
    setEvents(prev =>
        prev.map(e =>
        e.id === updatedEvent.id
            ? {
                ...e,
                ...updatedEvent,
                extendedProps: {
                ...(e.extendedProps || {}),
                ...(updatedEvent.extendedProps || {})
                }
            }
            : e
        )
    )
    }


  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  }
}
