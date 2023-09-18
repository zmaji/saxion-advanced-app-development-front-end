import type { Party } from '../types/Party';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPartiesFromStorage = async () => {
    try {
        const partiesJSON = await AsyncStorage.getItem('parties');
        return partiesJSON ? JSON.parse(partiesJSON) : [];
    } catch (error) {
        console.error('Error retrieving parties from AsyncStorage:', error);
        return [];
    }
};

export const addPartyToLocalstorage = async (party: Party): Promise<void> => {
    try {
        const existingPartiesJSON = await AsyncStorage.getItem('parties');
        const existingParties: Party[] = existingPartiesJSON
            ? JSON.parse(existingPartiesJSON)
            : [];

        const maxId = existingParties.reduce((max, party) => (party.id || 0) > max ? (party.id || 0) : max, 0);

        party.id = maxId + 1;

        existingParties.push(party);

        await AsyncStorage.setItem('parties', JSON.stringify(existingParties));
    } catch (error) {
        console.error('Error adding party to AsyncStorage:', error);
    }
};