import { useState } from "react";
import "./App.css";

import {
  ActionButtons,
  Contents,
  NoteButtons,
  Tempo,
  TimeSignature,
} from "./components/layouts";
import Bar from "./components/Bar";
import {
  ClearButton,
  NoteButton,
  PlayButton,
  RestButton,
  RollbackButton,
} from "./components/buttons";
import { DEFAULT_MAX_BEAT, DEFAULT_METER, DEFAULT_TEMPO } from "./utils";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [meter, setMeter] = useState(DEFAULT_METER);
  const [maxBeat, setMaxBeat] = useState(DEFAULT_MAX_BEAT);
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [barCount, setBarCount] = useState(1);
  const [currentBar, setCurrentBar] = useState(1);

  return (
    <>
      <Contents>
        <TimeSignature />
        <Tempo />
        <Bar tempo={tempo} meter={meter} maxBeat={maxBeat} />
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
