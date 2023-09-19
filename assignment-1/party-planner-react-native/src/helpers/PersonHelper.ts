import type { Person } from '../types/Person';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPeopleFromStorage = async () => {
  try {
    const peopleJSON = await AsyncStorage.getItem('people');
    return peopleJSON ? JSON.parse(peopleJSON) : [];
  } catch (error) {
    console.error('Error retrieving parties from AsyncStorage:', error);
    return [];
  }
};

export const addPersonToLocalstorage = async (person: Person): Promise<void> => {
  try {
    const existingPeopleJSON = await AsyncStorage.getItem('people');
    const existingPeople: Person[] = existingPeopleJSON
      ? JSON.parse(existingPeopleJSON)
      : [];

    const maxId = existingPeople.reduce((max, person) => (person.id || 0) > max ? (person.id || 0) : max, 0);

    person.id = maxId + 1;

    existingPeople.push(person);

    await AsyncStorage.setItem('parties', JSON.stringify(existingPeople));
  } catch (error) {
    console.error('Error adding person to AsyncStorage:', error);
  }
};