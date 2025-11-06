import { memo, useState } from "react";
import type { Note, NoteTime, NoteType } from "../../utils";
import { useBarStore } from "../../utils/store";
import { nanoid } from "nanoid";
import "./buttons.css";

const NoteButtons = ({ type = "normal" }: { type?: NoteType }) => {
  const [isDotted, setIsDotted] = useState(false);

  const handleDotToggle = () => {
    setIsDotted((prevState) => !prevState);
  };

  return (
    <div className="flex gap-2 overflow-x-scroll ">
      <button className="bg-indigo-300" onClick={handleDotToggle}>
        .
      </button>
      <NoteList isDotted={isDotted} type={type} />
    </div>
  );
};

const NoteList = ({
  isDotted = false,
  type,
}: {
  isDotted?: boolean;
  type: NoteType;
}) => {
  const namePrefix = isDotted ? "dotted-" : "";
  return (
    <div className="flex flex-row gap-2">
      <NoteItem
        type={type}
        time={isDotted ? 0.75 : 0.5}
        name={`${namePrefix}${type}-2`}
      />
      <NoteItem
        type={type}
        time={isDotted ? 0.375 : 0.25}
        name={`${namePrefix}${type}-4`}
      />
      <NoteItem
        type={type}
        time={isDotted ? 0.1875 : 0.125}
        name={`${namePrefix}${type}-8`}
      />
      <NoteItem
        type={type}
        time={isDotted ? 0.09375 : 0.0625}
        name={`${namePrefix}${type}-16`}
      />
      {!isDotted && (
        <>
          <NoteItem
            type={type}
            time={0.03125}
            name={`${namePrefix}${type}-32`}
          />
          {/* <NoteItem time={0.25} name="셋잇단음표" type="triplet" /> */}
        </>
      )}
    </div>
  );
};

const NoteItem = memo(
  ({
    time,
    name = "",
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
        className={`flex justify-center basis-sm text-sm size-20 note-btn`}
        onClick={handleBtnClick}
      >
        <div className={`note note--${type} ${name}`}></div>
      </button>
    );
  }
);

export default NoteButtons;
