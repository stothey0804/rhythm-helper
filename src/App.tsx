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
  PlayButton,
  RollbackButton,
  ClearButton,
} from "./components/buttons";

function App() {
  return (
    <>
      <Contents>
        <Wrapper>
          <TimeSignature />
          <Tempo />
        </Wrapper>
        <BarList />
        <Wrapper>
          <NoteButtons type="normal" />
        </Wrapper>
        <Wrapper>
          <NoteButtons type="rest" />
        </Wrapper>
        <ActionButtons>
          <RollbackButton />
          <PlayButton />
          <ClearButton />
        </ActionButtons>
      </Contents>
    </>
  );
}

const Wrapper = ({ children }: { children?: any }) => {
  return (
    <div className="flex justify-between my-4 overflow-x-scroll">
      {children}
    </div>
  );
};

export default App;
