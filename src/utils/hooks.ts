import { useRef, useCallback } from "react";
import { useBarStore, useGlobalStore } from "./store";
import type { Note } from "./types";

/**
 * 버튼을 오래 누르면 콜백이 반복 실행되는 훅
 * @param callback 실행할 함수
 * @param delay 반복 간격 (ms, 기본값: 100)
 * @param initialDelay 초기 지연 시간 (ms, 기본값: 500)
 * @returns 이벤트, 함수 전달 props
 */
export const useLongPress = (
  callback: () => void,
  delay = 80,
  initialDelay = 500
) => {
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const start = useCallback(() => {
    // 최초 한 번 실행
    callback();

    // initialDelay 후부터 반복 시작
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(callback, delay);
    }, initialDelay);
  }, [callback, delay, initialDelay]);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
};

/**
 * 악보 실행 훅
 * @param callback 해당 elements 배열
 * @returns play, stop function
 */
export const usePlayBar = (callback: () => Array<HTMLLIElement | null>) => {
  const tempo = useGlobalStore((state) => state.tempo);
  const maxBeat = useGlobalStore((state) => state.maxBeat);
  const currentBar = useBarStore((state) => state.currentBar);

  // 현재 마디의 총 길이 (ms)
  const BarTime = (60 / tempo) * maxBeat * 1000;
  // current bar 의 각 요소 길이 배열
  const timeArray = currentBar.map((item: Note) => item.time * BarTime);

  const timeoutRef = useRef<number | null>(null);

  const elementAction = useCallback((index: number) => {
    const elementArray = callback();
    const prevEl = elementArray[index - 1] || null;
    const nowEl = elementArray[index];
    if (nowEl) {
      if (prevEl) {
        prevEl.classList.remove("color-change");
      }
      nowEl.classList.add("color-change");
    }
  }, []);

  const clearBackground = useCallback(() => {
    const elementArray = callback();
    elementArray.forEach((elem) => {
      if (elem) elem.classList.remove("color-change");
    });
  }, []);

  const stop = useCallback(() => {
    clearBackground();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (timeoutRef.current) {
      stop();
    }

    let index = 0;

    const playNext = () => {
      // 반복 처리
      if (index >= timeArray.length) {
        clearBackground();
        index = 0;
      }

      // action
      elementAction(index);
      index++;

      // 현재 음표의 시간만큼 대기 후 다음 재생
      timeoutRef.current = window.setTimeout(() => {
        playNext();
      }, timeArray[index - 1]);
    };

    playNext();
  }, [timeArray, callback, stop]);

  return { play, stop };
};
