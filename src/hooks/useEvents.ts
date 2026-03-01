import { useState } from "react";
import type { Appointment } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<Appointment[]>([]);

  const addEvent = (event: Appointment) => {
    setEvents((prev) => [...prev, event]);
  };

  const updateEvent = (updated: Appointment) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return { events, addEvent, updateEvent, deleteEvent };
}