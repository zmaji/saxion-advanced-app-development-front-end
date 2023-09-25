import type { Attendee } from '@/types/Attendee';

export const addAttendeeToLocalstorage = (attendee: Attendee): void => {
  const existingPartiesJSON = localStorage.getItem('parties');
  const existingParties: Attendee[] = existingPartiesJSON
    ? JSON.parse(existingPartiesJSON)
    : [];

  const maxId = existingParties.reduce((max, attendee) => (attendee.id || 0) > max ? (attendee.id || 0) : max, 0);
  attendee.id = maxId + 1;

  existingParties.push(attendee);

  localStorage.setItem('attendees', JSON.stringify(existingParties));
}

export const getAttendeesFromLocalstorage = (): Attendee[] => {
  const attendeesJSON = localStorage.getItem('attendees');
  return attendeesJSON ? JSON.parse(attendeesJSON) : [];
}