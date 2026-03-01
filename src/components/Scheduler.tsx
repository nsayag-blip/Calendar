import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  EventInput,
  EventApi,
  EventChangeArg,
  DateSelectArg,
} from "@fullcalendar/core";
import type { Appointment, Room } from "../types";
import "./Scheduler.css";

import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

// --- Boundary converters (only file that knows about EventInput) ---

function toEventInput(a: Appointment): EventInput {
  return {
    id: a.id,
    title: a.title,
    start: a.start,
    end: a.end,
    resourceId: a.room,
    extendedProps: {
      patient: a.patient,
      room: a.room,
      type: a.type,
    },
  };
}

function toAppointment(event: EventApi): Appointment {
  return {
    id: event.id,
    title: event.title,
    start: event.start?.toISOString() ?? "",
    end: event.end?.toISOString(),
    patient: event.extendedProps.patient ?? "",
    room: event.getResources()[0]?.id ?? "",
    type: event.extendedProps.type ?? "",
  };
}

// --- Component ---

type SchedulerProps = {
  events: Appointment[];
  rooms: Room[];
  onEventChange: (event: Appointment) => void;
  onSelectSlot: (event: Appointment) => void;
  onSelectEvent: (event: Appointment) => void;
};

function Scheduler({
  events,
  rooms,
  onEventChange,
  onSelectSlot,
  onSelectEvent,
}: SchedulerProps) {
  const handleEventChange = (changeInfo: EventChangeArg) => {
    onEventChange(toAppointment(changeInfo.event));
  };

  const handleSelect = (selectInfo: DateSelectArg) => {
    const roomId = (selectInfo as any).resource?.id;

    const newAppointment: Appointment = {
      id: String(Date.now()),
      title: "",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      patient: "",
      room: roomId ?? "",
      type: "",
    };

    onSelectSlot(newAppointment);
  };

  function renderEventContent(eventInfo: { event: EventApi }) {
    const { event } = eventInfo;
    const { patient, room, type } = event.extendedProps;
    const start = event.start
      ? event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <div style={{ fontSize: "0.8rem", lineHeight: "1.1", padding: "2px" }}>
        <b>{event.title}</b> <br />
        {patient} | Room: {room} | {type} | {start}
      </div>
    );
  }

  const resources = rooms.map((room) => ({
    id: room.id,
    title: room.name,
  }));

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        resourceTimeGridPlugin,
      ]}
        datesAboveResources={true}   // ← this one prop does the swap

      initialView="resourceTimeGridWeek"
      editable={true}
      selectable={true}
      selectMirror={true}
      direction="rtl"
      height="auto"
      events={events.map(toEventInput)}
      select={handleSelect}
      eventChange={handleEventChange}
      eventContent={renderEventContent}
      eventClassNames={(arg) => {
        const type = arg.event.extendedProps.type;
        if (type === "Urgent") return ["urgent-event"];
        if (type === "Routine") return ["routine-event"];
        return [];
      }}
      eventClick={(arg) => {
        onSelectEvent(toAppointment(arg.event));
      }}
      resources={resources}
    />
  );
}

export default Scheduler;
