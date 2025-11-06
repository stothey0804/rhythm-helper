import { forwardRef, memo, useEffect, useRef } from "react";
import { useBarStore, useGlobalStore } from "../utils/store";
import { usePlayBar, type Note } from "../utils";
import "./bar.css";

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
      <ul className="bar-list flex flex-none justify-start w-full h-full overflow-hidden">
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

const getClassName = ({ type, time }: Note) => {
  let name = "";
  switch (time) {
    case 0.03125:
      name = `${type}-32`;
      break;
    case 0.09375:
      name = `dotted-${type}-16`;
      break;
    case 0.0625:
      name = `${type}-16`;
      break;
    case 0.125:
      name = `${type}-8`;
      break;
    case 0.1875:
      name = `dotted-${type}-8`;
      break;
    case 0.25:
      name = `${type}-4`;
      break;
    case 0.375:
      name = `dotted-${type}-4`;
      break;
    case 0.5:
      name = `${type}-2`;
      break;
    case 0.75:
      name = `dotted-${type}-2`;
      break;
    default:
      break;
  }

  return name;
};

const BarNoteItem = forwardRef<HTMLLIElement, { note: Note }>(
  ({ note }, ref) => {
    const { type } = note || {};

    return (
      <li className="flex list-none text-indigo-950 h-full" ref={ref}>
        <div
          className={`bar-note bar-note--${type} ${getClassName(note)}`}
        ></div>
      </li>
    );
  }
);

export default Bar;
