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

export type NoteType = "note" | "rest";

export interface Note {
  type: NoteType;
  time: number;
}

export type BarData = Array<Note>;

export type BarArray = Array<BarData>;
