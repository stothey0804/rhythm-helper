import { memo } from "react";
import { useBarStore } from "../utils/store";
import type { Note } from "../utils";

const Bar = memo(() => {
  const bar = useBarStore((state) => state.currentBar);

  return (
    <div>
      <ul>
        {bar.length > 0 &&
          bar.map((item: Note) => <BarNoteItem key={item.id} note={item} />)}
      </ul>
    </div>
  );
});

const BarNoteItem = ({ note }: { note: Note }) => {
  const { type, time } = note || {};
  return (
    <li>
      {type}
      {time}
    </li>
  );
};

export default Bar;
