export interface NoteButtonProps {
  meter?: number;
  maxBeat?: number;
}

export interface TimeSignatureProps {
  meter?: number;
  beat?: number;
}

export interface TempoProps {
  bpm?: number;
}

export type NoteType = "normal" | "rest" | "triplet";

// 음표의 길이 단위
export type NoteTime =
  | 1
  | 0.75
  | 0.5
  | 0.375
  | 0.25
  | 0.1875
  | 0.125
  | 0.0625
  | 0.09375
  | 0.03125;

export interface Note {
  id: string;
  type: NoteType;
  time: NoteTime;
}

export type BarData = Array<Note>;

export type BarArray = Array<BarData>;
