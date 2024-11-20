import { create } from "zustand";

const useData = create((set) => ({
  floor: 5,
  view: 3,
  subView: 3,
  db: true,
  toggleDB: () => set((state) => ({ db: !state.db })),
  updateFloor: (newFloor) => set({ floor: newFloor }),
  updateView: (newView) => set({ view: newView }),
  updateSubView: (newSubView) => set({ subView: newSubView }),
}));

export default useData;
