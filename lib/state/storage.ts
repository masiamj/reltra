/**
 * This utility creates an interface to underlying storage engines
 * for our persistence layer.
 */
import type { ProxyPersistStorageEngine } from 'valtio-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const asyncStorageAdapter: ProxyPersistStorageEngine = {
  getItem: (name) => AsyncStorage.getItem(name),
  setItem: (name, value) => AsyncStorage.setItem(name, value),
  removeItem: (name) => AsyncStorage.removeItem(name),
  getAllKeys: () => AsyncStorage.getAllKeys(),
}
