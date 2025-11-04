import { useRef, useCallback } from "react";

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
