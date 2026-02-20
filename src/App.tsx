// import Scheduler from './components/Scheduler'
// import { useEvents } from './hooks/useEvents'


// function App() {
//   const { events, addEvent, updateEvent } = useEvents()
  

//   return (
//     <div>
//       <h1>Medical Scheduler</h1>
//       <Scheduler events={events} onAddEvent={addEvent} onEventChanging={updateEvent} />
//     </div>
//   )
// }

// export default App




import Scheduler from './components/Scheduler'
import { useEvents } from './hooks/useEvents'
import { useState } from 'react'
import type { EventInput } from '@fullcalendar/core'
import EventModal from './components/EventModal'


function App() {
  const { events, addEvent, updateEvent,deleteEvent } = useEvents()
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null)


  return (
    <div>
      <h1>Medical Scheduler</h1>
      <Scheduler events={events} onAddEvent={addEvent} onEventChanging={updateEvent} onSelectEvent={(event) => setSelectedEvent(event)} />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSave={(updated) => {
            const exists = events.some(e => e.id === updated.id)

            if (exists) {
              updateEvent(updated)
            } else {
              addEvent(updated)
            }

            setSelectedEvent(null)
          }
        }
          onDelete={() => {
            deleteEvent(selectedEvent.id as string)
            setSelectedEvent(null)
          }
        }
        />
      )}

    </div>
  )
}

export default App
