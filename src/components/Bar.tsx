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
    <div className="bg-white rounded-lg" style={{ height: 120 }}>
      <ul className="flex flex-none justify-start w-full h-full overflow-hidden">
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
      <li className="flex list-none text-indigo-950 h-full" ref={ref}>
        {type} {time}
      </li>
    );
  }
);

export default Bar;
