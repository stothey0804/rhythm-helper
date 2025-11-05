import { create } from "zustand";
import type { BarArray, BarData, Note } from "./types";
import {
  DEFAULT_MAX_BEAT,
  DEFAULT_METER,
  DEFAULT_TEMPO,
  MAX_TEMPO,
  MIN_TEMPO,
} from "./constants";

type BarState = {
  barList: BarArray;
  currentBar: BarData;
  barIndex: number;
};

type BarAction = {
  updateBarList: (barList: BarState["barList"]) => void;
  updateCurrentBar: (currentBar: BarState["currentBar"]) => void;
  updateBarIndex: (barIndex: BarState["barIndex"]) => void;
  getTotalBarTime: () => number;
  addNote: (note: Note) => void;
  removeNote: () => void;
  resetBar: () => void;
  resetBarList: () => void;
};

export const useBarStore = create<BarState & BarAction>((set, get) => ({
  barList: [],
  barIndex: 0,
  currentBar: [],
  updateBarList: (newList) => {
    set(() => ({
      barList: newList,
    }));
  },
  updateCurrentBar: (newBar) => {
    set({ currentBar: newBar });

    // currentBar가 업데이트되면 barList에도 반영
    const { barList, barIndex } = get();
    const updatedList = [...barList];
    updatedList[barIndex] = newBar;
    set({ barList: updatedList });
  },
  updateBarIndex: (newIndex) => {
    set({ barIndex: newIndex });

    // barIndex가 바뀌면 해당 인덱스의 bar를 currentBar로 설정
    const { barList } = get();
    if (barList[newIndex]) {
      set({ currentBar: barList[newIndex] });
    }
  },
  getTotalBarTime: () => {
    const { currentBar } = get();
    const result = currentBar
      ?.map((note) => note.time)
      .reduce((prev, curr) => prev + curr, 0);
    return result || 0;
  },
  addNote: (note) => {
    const totalTime = get().getTotalBarTime();
    const { maxBeat, meter } = useGlobalStore.getState();
    const maxTime = maxBeat / meter;
    const { time } = note;
    if (maxTime - totalTime - time >= 0) {
      set((state) => ({ currentBar: [...state.currentBar, note] }));
    }
  },
  removeNote: () => {
    set((state) => ({
      currentBar: [...state.currentBar.slice(0, state.currentBar.length - 1)],
    }));
  },
  resetBar: () => {
    set({ currentBar: [] });
  },
  resetBarList: () => {
    set({ currentBar: [] });
    set({ barList: [[]] });
    set({ barIndex: 0 });
  },
}));

type GlobalState = {
  isPlaying: boolean;
  meter: number;
  maxBeat: number;
  tempo: number;
  barCount: number;
};

type GlobalAction = {
  toggleIsPlaying: (isPlaying: GlobalState["isPlaying"]) => void;
  updateMeter: (meter: GlobalState["meter"]) => void;
  updateMaxBeat: (maxBeat: GlobalState["maxBeat"]) => void;
  updateTempo: (tempo: GlobalState["tempo"]) => void;
  updatebarCount: (barCount: GlobalState["barCount"]) => void;
  increaseTempo: () => void;
  decreaseTempo: () => void;
};

export const useGlobalStore = create<GlobalState & GlobalAction>(
  (set, get) => ({
    isPlaying: false,
    meter: DEFAULT_METER,
    maxBeat: DEFAULT_MAX_BEAT,
    tempo: DEFAULT_TEMPO,
    barCount: 1,
    toggleIsPlaying: () => {
      set((state) => ({ isPlaying: !state.isPlaying }));
    },
    updateMeter: (newState) => {
      set({ meter: newState });
    },
    updateMaxBeat: (newState) => {
      set({ maxBeat: newState });
    },
    updateTempo: (newState) => {
      set({ tempo: newState });
    },
    updatebarCount: (newState) => {
      set({ barCount: newState });
    },
    increaseTempo: () => {
      if (get().tempo < MAX_TEMPO) {
        set((state) => ({ tempo: state.tempo + 1 }));
      }
    },
    decreaseTempo: () => {
      if (get().tempo > MIN_TEMPO) {
        set((state) => ({ tempo: state.tempo - 1 }));
      }
    },
  })
);
