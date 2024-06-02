import { create } from "zustand";

type State = {
  isVoting: boolean;
};

type Action = {
  updateIsVoting: (isVoting: State["isVoting"]) => void;
};

export const useAppStore = create<State & Action>((set) => ({
  isVoting: false,
  updateIsVoting: (isVoting) => set({ isVoting: isVoting }),
}));
