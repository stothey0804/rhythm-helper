export interface BarProps {
  meter?: number;
  maxBeat?: number;
  tempo?: number;
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
