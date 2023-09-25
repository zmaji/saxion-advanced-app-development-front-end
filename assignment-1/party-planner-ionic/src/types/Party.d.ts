export interface Party {
  id: number,
  title: string,
  description: string,
  location: string,
  datetime: string,
  attendees: Attendee[] | null;
}