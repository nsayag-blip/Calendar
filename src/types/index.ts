export interface Appointment {
  id: string;
  title: string;
  start: string;
  end?: string;
  patient: string;
  room: string;
  type: "Routine" | "Urgent";
  resourceId?: string; // add this for room association
}

export type Room = {
  id: string;
  name: string;
};
