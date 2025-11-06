import { memo, useState } from "react";
import type { Note, NoteTime, NoteType } from "../../utils";
import { useBarStore } from "../../utils/store";
import { nanoid } from "nanoid";

const RestButtons = () => {
  const [isDotted, setIsDotted] = useState(false);

  const handleDotToggle = () => {
    setIsDotted((prevState) => !prevState);
  };

  return (
    <div className="flex gap-2 overflow-x-scroll">
      <button onClick={handleDotToggle}>.</button>
      <RestList isDotted={isDotted} />
    </div>
  );
};

const RestList = ({ isDotted = false }: { isDotted?: boolean }) => {
  const namePrefix = isDotted ? "점" : "";
  return (
    <div className="flex flex-row gap-2">
      <RestItem time={isDotted ? 0.75 : 0.5} name={`${namePrefix}2분쉼표`} />
      <RestItem time={isDotted ? 0.375 : 0.25} name={`${namePrefix}4분쉼표`} />
      <RestItem
        time={isDotted ? 0.1875 : 0.125}
        name={`${namePrefix}8분쉼표`}
      />
      <RestItem
        time={isDotted ? 0.09375 : 0.0625}
        name={`${namePrefix}16분쉼표`}
      />
      {isDotted && <RestItem time={0.03125} name={`32분쉼표`} />}
    </div>
  );
};

const RestItem = memo(
  ({ time, name }: { time: NoteTime; name: string; type?: NoteType }) => {
    const addNote = useBarStore((state) => state.addNote);

    const handleBtnClick = () => {
      const thisNote: Note = {
        id: nanoid(),
        type: "rest",
        time: time,
      };
      addNote(thisNote);
    };

    return (
      <button
        className="flex basis-sm text-sm size-20"
        onClick={handleBtnClick}
      >
        {name}
      </button>
    );
  }
);

export default RestButtons;
