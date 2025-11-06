import { useState, useCallback } from "react";
import { useGlobalStore } from "../../utils/store";
import { MAX_TEMPO, MIN_TEMPO, useLongPress } from "../../utils";
import "./modal.css";

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
        {meter === 4 ? "♩" : "♩."} = {tempo}
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
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={() => toggleIsLayerOpen()} />

      {/* Modal */}
      <div className="modal-container">
        <h3 className="modal-title">템포 설정</h3>

        <div className="tempo-controls">
          <button {...decreaseProps} className="tempo-btn">
            -
          </button>
          <input
            type="number"
            value={tempo}
            onChange={handleTempoChange}
            onBlur={handleTempoBlur}
            className="tempo-input"
          />
          <button {...increaseProps} className="tempo-btn">
            +
          </button>
        </div>

        <div className="tempo-slider-container">
          <input
            type="range"
            min={MIN_TEMPO}
            max={MAX_TEMPO}
            value={tempo}
            onChange={handleTempoChange}
            className="tempo-slider"
          />
          <div className="tempo-range-labels">
            <span>{MIN_TEMPO}</span>
            <span>{MAX_TEMPO}</span>
          </div>
        </div>

        <button
          onClick={() => toggleIsLayerOpen()}
          className="modal-btn-primary"
        >
          확인
        </button>
      </div>
    </>
  );
};

export default Tempo;
