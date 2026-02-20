import { useState } from "react";
import type { EventInput } from "@fullcalendar/core";
import "./Scheduler.css";

interface EventModalProps {
  event: EventInput;
  onClose: () => void;
  onSave: (updatedEvent: EventInput) => void;
  onDelete: (id: string) => void;
}

export default function EventModal({
  event,
  onClose,
  onSave,
  onDelete,
}: EventModalProps) {
  // Local state to edit the fields
  const [title, setTitle] = useState(event.title || "");
  const [patient, setPatient] = useState(event.extendedProps?.patient || "");
  const [room, setRoom] = useState(event.extendedProps?.room || "");
  const [type, setType] = useState(event.extendedProps?.type || "");
  const [errors, setErrors] = useState<{ title?: string; type?: string }>({});

  // Called when the user clicks "Save"
  const handleSave = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!type) newErrors.type = "Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if everything is valid
    setErrors({});
    onSave({
      ...event,
      title,
      extendedProps: {
        patient,
        room,
        type,
      },
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Event</h3>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{ borderColor: errors.title ? "red" : undefined }}
          />
          {errors.title && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.title}
            </span>
          )}
        </div>
        <input
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Patient"
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room"
        />
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
        />
        <div>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ borderColor: errors.type ? "red" : undefined }}
          >
            <option value="">Select Type</option>
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
          </select>
          {errors.type && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.type}
            </span>
          )}
        </div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "5px" }}>
            Cancel
          </button>
        </div>
        <button
          onClick={() => {
            if (event.id) {
              onDelete(event.id as string);
            }
          }}
          style={{ marginTop: "10px", background: "#d32f2f", color: "white" }}
        >
          Delete
        </button>{" "}
      </div>
    </div>
  );
}
