import { create } from "zustand";

const authStore = create((set) => ({
  user: {},
  isUserLogin: false,

  setUser: (user: any) => set({ user }),
  setIsUserLogin: (isUserLogin: boolean) => set({ isUserLogin }),
}));

export default authStore;
