import * as Network from 'expo-network';

export const isOnline = async ():Promise<boolean> => {
  // Returns 0.0.0.0 if the IP address could not be retrieved.
  const networkIP = await Network.getIpAddressAsync();

  return networkIP !== '0.0.0.0';
};
