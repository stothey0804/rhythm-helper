import "./App.css";

import {
  ActionButtons,
  BarList,
  Contents,
  Tempo,
  TimeSignature,
} from "./components/layouts";
import {
  NoteButtons,
  RestButtons,
  PlayButton,
  RollbackButton,
  ClearButton,
} from "./components/buttons";

function App() {
  return (
    <>
      <Contents>
        <TimeSignature />
        <Tempo />
        <BarList />
        <NoteButtons />
        <RestButtons />
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
