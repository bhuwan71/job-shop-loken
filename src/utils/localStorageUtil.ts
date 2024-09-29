
// Set an item in local storage
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get an item from local storage
export const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Remove an item from local storage
export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};
