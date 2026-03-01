import { useState } from "react";
import type { Appointment } from "../types";
import "./Scheduler.css";

interface EventModalProps {
  event: Appointment;
  onClose: () => void;
  onSave: (updated: Appointment) => void;
  onDelete: () => void; // id comes from the event itself, caller handles it
}

export default function EventModal({
  event,
  onClose,
  onSave,
  onDelete,
}: EventModalProps) {
  const [title, setTitle] = useState(event.title);
  const [patient, setPatient] = useState(event.patient);
  const [room, setRoom] = useState(event.room);
  const [type, setType] = useState<Appointment["type"]>(event.type);
  const [errors, setErrors] = useState<{ title?: string; type?: string }>({});

  const handleSave = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!type) newErrors.type = "Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSave({ ...event, title, patient, room, type });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{event.title ? "Edit Appointment" : "New Appointment"}</h3>

        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Checkup"
            style={{ borderColor: errors.title ? "red" : undefined }}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div>
          <label>Patient</label>
          <input
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            placeholder="Patient name"
          />
        </div>

        <div>
          <label>Room</label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room number"
          />
        </div>

        <div>
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Appointment["type"])}
            style={{ borderColor: errors.type ? "red" : undefined }}
          >
            <option value="">Select Type</option>
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
          </select>
          {errors.type && <span className="error-text">{errors.type}</span>}
        </div>

        <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

        {event.id && (
          <button
            onClick={onDelete}
            style={{ marginTop: "10px", background: "#d32f2f", color: "white" }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
