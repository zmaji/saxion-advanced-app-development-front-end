import axios from 'axios';
import * as Location from 'expo-location';
import { OPEN_CAGE_DATA_API_KEY } from '../../config';
import { AIRLABS_API_KEY } from '../../config';

export const promptAuthorization = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return false;
  }
  return true;
}

export const getCurrentCity = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?key=${OPEN_CAGE_DATA_API_KEY}&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    );

    if (response.data.results.length > 0) {
      const city = response.data.results[0].components.city
      return city;
    }
  } catch (error) {
    console.error('Error fetching location information:', error);
  }
  return null;
};

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return;
  }

  try {
    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  } catch (error) {
    console.error('Error fetching current location:', error);
  }
};

export const getNearbyAirports = async (latitude: number, longitude: number, distance: number) => {
  try {
    const response = await axios.get(`https://airlabs.co/api/v9/nearby?lat=${latitude}&lng=${longitude}&distance=${distance}&api_key=${AIRLABS_API_KEY}`, {
    });

    return response.data.response.airports;
  } catch (error) {
    console.error('Error fetching airport information:', error);
  }
};