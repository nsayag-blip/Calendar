import { useState } from "react";
import type { Room } from "../types";

export function useRooms() {
  const [rooms] = useState<Room[]>([
    { id: "room1", name: "Room 1" },
    { id: "room2", name: "Room 2" },
    { id: "room3", name: "Room 3" },
  ]);

  return { rooms };
}