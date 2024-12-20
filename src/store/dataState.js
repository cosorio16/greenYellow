import { create } from "zustand";

const useData = create((set) => ({
  floor: 5,
  view: 0,
  subView: 0,
  db: false,
  toggleDB: () => set((state) => ({ db: !state.db })),
  updateFloor: (newFloor) => set({ floor: newFloor }),
  updateView: (newView) => set({ view: newView }),
  updateSubView: (newSubView) => set({ subView: newSubView }),
}));

export default useData;
