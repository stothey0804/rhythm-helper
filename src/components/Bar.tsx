import { forwardRef, memo, useEffect, useRef } from "react";
import { useBarStore, useGlobalStore } from "../utils/store";
import { usePlayBar, type Note } from "../utils";

const Bar = memo(() => {
  const bar = useBarStore((state) => state.currentBar);
  const isPlaying = useGlobalStore((state) => state.isPlaying);

  const itemsRefs = useRef<(HTMLLIElement | null)[]>([]);

  const getElements = (): HTMLLIElement[] => {
    return itemsRefs.current.filter((el): el is HTMLLIElement => el !== null);
  };

  const { play, stop } = usePlayBar(getElements);

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
  }, [isPlaying]);

  return (
    <div>
      <ul>
        {bar.length > 0 &&
          bar.map((item: Note, idx) => (
            <BarNoteItem
              key={item.id}
              note={item}
              ref={(el) => {
                itemsRefs.current[idx] = el;
              }}
            />
          ))}
      </ul>
    </div>
  );
});

const BarNoteItem = forwardRef<HTMLLIElement, { note: Note }>(
  ({ note }, ref) => {
    const { type, time } = note || {};
    return (
      <li ref={ref}>
        {type}
        {time}
      </li>
    );
  }
);

export default Bar;
