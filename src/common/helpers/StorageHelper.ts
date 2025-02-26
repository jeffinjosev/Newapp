import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
/**
 * Store data to EncryptedStorage
 *
 * @param {Object} key - The key in which data stores.
 * @param {Object} data - The  data to be stored.
 */
async function storeSecureData(key: string, data: any) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
}

/**
 * Retrive data from EncryptedStorage
 *
 * @param {Object} key - The key in which data stored.
 *
 * @returns Data or null
 */
async function getSecureData(key: string) {
  try {
    const data = await EncryptedStorage.getItem(key);

    if (data !== undefined) {
      return data;
    } else {
      return null;
    }
  } catch (error) {}
}
/**
 * Delete data from EncryptedStorage
 *
 * @param {Object} key - The key in which data stored.
 *
 */
async function deleteSecureItem(key: string) {
  // Removing a value
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {}
}
/**
 *Clearing all previously saved values
 *
 *
 */
async function clearSecureStorage() {
  // Clearing all previously saved values
  try {
    await EncryptedStorage.clear();
  } catch (error) {}
}
/**
 * Retrive data from AsyncStorage
 *
 * @param {Object} key - The key in which data stored.
 *
 * @returns Data or null
 */
//@ts-ignore
async function getItem(key: string): Promise<null | string> {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (error) {
    // Error retrieving data
  }
}
/**
 * Store data to AsyncStorage
 *
 * @param {Object} key - The key in which data stores.
 * @param {Object} item - The  data to be stored.
 */
async function storeItem(key: string, item: any) {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    // Error saving data
  }
}
/**
 * Delete data from AsyncStorage
 *
 * @param {Object} key - The key in which data stored.
 *
 */
async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error saving data
  }
}

export default {
  getItem,
  storeItem,
  removeItem,
  storeSecureData,
  getSecureData,
  deleteSecureItem,
  clearSecureStorage,
};
