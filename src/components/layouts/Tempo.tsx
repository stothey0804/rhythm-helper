import { useState, useCallback } from "react";
import { useGlobalStore } from "../../utils/store";
import { MAX_TEMPO, MIN_TEMPO, useLongPress } from "../../utils";

const Tempo = () => {
  const meter = useGlobalStore((state) => state.meter);
  const tempo = useGlobalStore((state) => state.tempo);

  const [isLayerOpen, setIsLayerOpen] = useState(false);

  const toggleIsLayerOpen = () => {
    setIsLayerOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={() => toggleIsLayerOpen()}>
        {meter === 4 ? "♩" : "♪"} = {tempo}
      </button>
      {isLayerOpen && <TempoLayer toggleIsLayerOpen={toggleIsLayerOpen} />}
    </div>
  );
};

const TempoLayer = ({ toggleIsLayerOpen }: { toggleIsLayerOpen: Function }) => {
  const tempo = useGlobalStore((state) => state.tempo);
  const increaseTempo = useGlobalStore((state) => state.increaseTempo);
  const decreaseTempo = useGlobalStore((state) => state.decreaseTempo);
  const updateTempo = useGlobalStore((state) => state.updateTempo);

  const increaseProps = useLongPress(increaseTempo);
  const decreaseProps = useLongPress(decreaseTempo);

  const handleTempoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value || 0;
      updateTempo(value);
    },
    [updateTempo]
  );

  const handleTempoBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = +e.target.value || 0;
      if (MIN_TEMPO > value) {
        updateTempo(MIN_TEMPO);
      } else if (MAX_TEMPO < value) {
        updateTempo(MAX_TEMPO);
      }
    },
    [updateTempo]
  );

  return (
    <div>
      <div>
        <button {...decreaseProps}>{"-"}</button>
        <input
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          onBlur={handleTempoBlur}
        />
        <button {...increaseProps}>{"+"}</button>
      </div>
      <div>
        <input
          type="range"
          min={MIN_TEMPO}
          max={MAX_TEMPO}
          value={tempo}
          onChange={handleTempoChange}
        ></input>
      </div>
      <div>
        <button onClick={() => toggleIsLayerOpen()}>닫기</button>
      </div>
    </div>
  );
};

export default Tempo;
