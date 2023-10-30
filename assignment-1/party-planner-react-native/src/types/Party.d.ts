import type { Person } from './Person';

export interface Party {
  id: number,
  title: string,
  description: string,
  location: string,
  date: string,
  time: string,
  attendees: Person[]
}