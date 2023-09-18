import type { Party } from '@/types/party';

export const addPartyToLocalstorage = (party: Party): void => {
    const existingPartiesJSON = localStorage.getItem('parties');
    const existingParties: Party[] = existingPartiesJSON
        ? JSON.parse(existingPartiesJSON)
        : [];

    const maxId = existingParties.reduce((max, party) => (party.id || 0) > max ? (party.id || 0) : max, 0);
    party.id = maxId + 1;

    existingParties.push(party);

    localStorage.setItem('parties', JSON.stringify(existingParties));
}