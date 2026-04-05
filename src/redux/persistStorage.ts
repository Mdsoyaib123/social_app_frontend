const storage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

export default storage;