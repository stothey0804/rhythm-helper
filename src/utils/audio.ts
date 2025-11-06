import type { NoteType } from "./types";

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }
  return audioContext;
};

/**
 * 메트로놈 클릭 소리 재생
 * @param type
 */
export const playMetronomeClick = (type: NoteType) => {
  if (type === "rest") {
    return;
  }

  const ctx = getAudioContext();
  const currentTime = ctx.currentTime;

  // 오실레이터 톤 생성
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // 주파수
  let frequency: number;
  frequency = 900;

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  // 볼륨
  gainNode.gain.setValueAtTime(0.3, currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.05);

  // 연결
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // 재생
  oscillator.start(currentTime);
  oscillator.stop(currentTime + 0.05);
};

export const cleanupAudioContext = () => {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
};
