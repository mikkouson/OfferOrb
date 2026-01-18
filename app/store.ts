import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DataStore<T> {
  data: T[];
  addData: (newItem: T) => void;
  reset: () => void;
}

export const useDataStore = create<DataStore<any>>()(
  persist(
    (set) => ({
      data: [],

      addData: (newItem) =>
        set((state) => ({
          data: [...state.data, newItem],
        })),

      reset: () => set({ data: [] }),
    }),
    {
      name: "data-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
