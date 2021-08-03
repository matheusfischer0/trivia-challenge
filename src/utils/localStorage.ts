import AsyncStorage from "@react-native-async-storage/async-storage";

async function save(key: string, payload: string) {
  await AsyncStorage.setItem(key, payload);
}
async function get(key: string) {
  return await AsyncStorage.getItem(key);
}
async function remove(key: string) {
  await AsyncStorage.removeItem(key);
}

export { save, get, remove };
