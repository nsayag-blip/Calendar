export type Appointment = {
    id: string
    title: string
    start: string
    end?: string
    patient: string
    room: string
    type: 'Routine' | 'Urgent'
}
