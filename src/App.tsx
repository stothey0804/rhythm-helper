import "./App.css";

import {
  ActionButtons,
  BarList,
  Contents,
  NoteButtons,
  Tempo,
  TimeSignature,
} from "./components/layouts";
import {
  ClearButton,
  NoteButton,
  PlayButton,
  RestButton,
  RollbackButton,
} from "./components/buttons";

function App() {
  return (
    <>
      <Contents>
        <TimeSignature />
        <Tempo />
        <BarList />
        <NoteButtons>
          <NoteButton />
          <RestButton />
        </NoteButtons>
        <ActionButtons>
          <RollbackButton />
          <PlayButton />
          <ClearButton />
        </ActionButtons>
      </Contents>
    </>
  );
}

export default App;
