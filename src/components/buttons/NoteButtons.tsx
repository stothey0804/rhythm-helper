import { memo, useState } from "react";
import type { Note, NoteTime, NoteType } from "../../utils";
import { useBarStore } from "../../utils/store";
import { nanoid } from "nanoid";

const NoteButtons = () => {
  const [isDotted, setIsDotted] = useState(false);

  const handleDotToggle = () => {
    setIsDotted((prevState) => !prevState);
  };

  return (
    <div className="flex gap-2 overflow-x-scroll ">
      <button className="bg-indigo-300" onClick={handleDotToggle}>
        .
      </button>
      <NoteList isDotted={isDotted} />
    </div>
  );
};

const NoteList = ({ isDotted = false }: { isDotted?: boolean }) => {
  const namePrefix = isDotted ? "점" : "";
  return (
    <div className="flex flex-row gap-2">
      <NoteItem time={isDotted ? 0.75 : 0.5} name={`${namePrefix}2분음표`} />
      <NoteItem time={isDotted ? 0.375 : 0.25} name={`${namePrefix}4분음표`} />
      <NoteItem
        time={isDotted ? 0.1875 : 0.125}
        name={`${namePrefix}8분음표`}
      />
      <NoteItem
        time={isDotted ? 0.09375 : 0.0625}
        name={`${namePrefix}16분음표`}
      />
      {!isDotted && (
        <>
          <NoteItem time={0.03125} name="32분음표" />
          <NoteItem time={0.25} name="셋잇단음표" type="triplet" />
        </>
      )}
    </div>
  );
};

const NoteItem = memo(
  ({
    time,
    name,
    type = "normal",
  }: {
    time: NoteTime;
    name: string;
    type?: NoteType;
  }) => {
    const addNote = useBarStore((state) => state.addNote);

    const handleBtnClick = () => {
      const thisNote: Note = {
        id: nanoid(),
        type: type,
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

export default NoteButtons;
