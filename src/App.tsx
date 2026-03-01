// // import Scheduler from './components/Scheduler'
// // import { useEvents } from './hooks/useEvents'

// // function App() {
// //   const { events, addEvent, updateEvent } = useEvents()

// //   return (
// //     <div>
// //       <h1>Medical Scheduler</h1>
// //       <Scheduler events={events} onAddEvent={addEvent} onEventChanging={updateEvent} />
// //     </div>
// //   )
// // }

// // export default App

// import Scheduler from './components/Scheduler'
// import { useEvents } from './hooks/useEvents'
// import { useState } from 'react'
// import type { EventInput } from '@fullcalendar/core'
// import EventModal from './components/EventModal'

// function App() {
//   const { events, addEvent, updateEvent,deleteEvent } = useEvents()
//   const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null)

//   return (
//     <div>
//       <h1>Medical Scheduler</h1>
//       <Scheduler events={events} onAddEvent={addEvent} onEventChanging={updateEvent} onSelectEvent={(event) => setSelectedEvent(event)} />
//       {selectedEvent && (
//         <EventModal
//           event={selectedEvent}
//           onClose={() => setSelectedEvent(null)}
//           onSave={(updated) => {
//             const exists = events.some(e => e.id === updated.id)

//             if (exists) {
//               updateEvent(updated)
//             } else {
//               addEvent(updated)
//             }

//             setSelectedEvent(null)
//           }
//         }
//           onDelete={() => {
//             deleteEvent(selectedEvent.id as string)
//             setSelectedEvent(null)
//           }
//         }
//         />
//       )}

//     </div>
//   )
// }

// export default App

import { useState } from "react";
import Scheduler from "./components/Scheduler";
import EventModal from "./components/EventModal";
import { useEvents } from "./hooks/useEvents";
import { useRooms } from "./hooks/useRooms";
import type { Appointment } from "./types";

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const { rooms } = useRooms();

  const handleSave = (updated: Appointment) => {
    const exists = events.some((e) => e.id === updated.id);
    if (exists) {
      updateEvent(updated);
    } else {
      addEvent(updated);
    }
    setSelectedEvent(null);
  };

  return (
    <div>
      <h1>Medical Scheduler</h1>
      <Scheduler
        events={events}
        onEventChange={updateEvent}
        onSelectSlot={setSelectedEvent}
        onSelectEvent={setSelectedEvent}
        rooms={rooms}
      />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSave={handleSave}
          onDelete={() => {
            deleteEvent(selectedEvent.id);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
