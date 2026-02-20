import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput, EventApi } from "@fullcalendar/core";

import "./Scheduler.css";

type SchedulerProps = {
  events: EventInput[];
  onAddEvent: (event: EventInput) => void;
  onEventChanging: (event: EventInput) => void;
  onSelectEvent: (event: EventInput) => void;
};

function Scheduler({
  events,
  onAddEvent,
  onEventChanging,
  onSelectEvent,
}: SchedulerProps) {
  // const handleDateClick = (arg : any) => {
  //     const newEvent: EventInput = {
  //         id: String(Date.now()), // simple unique ID
  //         title: 'New Event',
  //         start: arg.dateStr,
  //         type: 'Routine',
  //     }
  //     onAddEvent(newEvent)
  // }

  const handleEventChange = (changeInfo: any) => {
    console.log("Event changed:", changeInfo.event);
    const plainEvent: EventInput = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.start?.toISOString(), // convert to string
      end: changeInfo.event.end?.toISOString(),
      extendedProps: changeInfo.event.extendedProps,
    };
    console.log("plainEvent.start", plainEvent.start);
    onEventChanging(plainEvent); // send UP to parent
  };

  function renderEventContent(eventInfo: { event: EventApi }) {
    const { event } = eventInfo;
    const patient = event.extendedProps.patient;
    const room = event.extendedProps.room;
    const type = event.extendedProps.type;
    const start = event.start
      ? event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <div
        style={{
          fontSize: "0.8rem",
          lineHeight: "1.1",
          padding: "2px",
          position: "relative",
        }}
      >
        <b>{event.title}</b> <br />
        {patient} | Room: {room} | {type}
        Start: {start}
      </div>
    );
  }

  const handleSelect = (selectInfo: any) => {
    const newEvent: EventInput = {
      id: String(Date.now()),
      title: "",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      extendedProps: {
        patient: "",
        room: "",
        type: "",
      },
    };

    onSelectEvent(newEvent);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      editable={true}
      select={handleSelect}
      events={events}
      height="auto"
      //dateClick={handleDateClick}
      selectable={true}
      eventChange={handleEventChange}
      eventContent={renderEventContent}
      eventClassNames={(arg) => {
        const type = arg.event.extendedProps.type;

        if (type === "Urgent") return ["urgent-event"];
        if (type === "Routine") return ["routine-event"];
        return [];
      }}
      eventClick={(arg) => {
        const event = arg.event;
        const plainEvent: EventInput = {
          id: event.id,
          title: event.title,
          start: event.start?.toISOString(),
          end: event.end?.toISOString(),
          extendedProps: event.extendedProps,
        };
        onSelectEvent(plainEvent);
      }}
      selectMirror={true}
      direction="rtl"
    />
  );
}

export default Scheduler;
