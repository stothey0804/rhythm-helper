import { useState } from "react";
import { useBarStore, useGlobalStore } from "../../utils/store";
import { CONFIRM_MSG_METER_CHANGE_KR } from "../../utils";

const TimeSignature = ({}) => {
  // 기준박과 최대 갯수
  const meter = useGlobalStore((state) => state.meter);
  const maxBeat = useGlobalStore((state) => state.maxBeat);
  const [isLayerOpen, setIsLayerOpen] = useState(false);

  const toggleIsLayerOpen = () => {
    setIsLayerOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={() => toggleIsLayerOpen()}>
        {maxBeat}/{meter}
      </button>
      {isLayerOpen && <TimeLayer toggleIsLayerOpen={toggleIsLayerOpen} />}
    </div>
  );
};

const TimeLayer = ({ toggleIsLayerOpen }: { toggleIsLayerOpen: Function }) => {
  const updateMeter = useGlobalStore((state) => state.updateMeter);
  const updateMaxBeat = useGlobalStore((state) => state.updateMaxBeat);
  const currentBar = useBarStore((state) => state.currentBar);
  const resetBarList = useBarStore((state) => state.resetBarList);

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.dataset.value);
    const { value } = e.currentTarget.dataset ?? {};
    const [newMaxBeat, newMeter]: [string, string] =
      (value?.split("/") as [string, string]) ?? [];

    if (newMaxBeat && newMeter) {
      if (currentBar.length > 0 && !confirm(CONFIRM_MSG_METER_CHANGE_KR)) {
        return;
      }
      resetBarList();
      updateMaxBeat(+newMaxBeat);
      updateMeter(+newMeter);
      toggleIsLayerOpen();
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleBtnClick} data-value={"1/4"}>
          1/4
        </button>
        <button onClick={handleBtnClick} data-value={"2/4"}>
          2/4
        </button>
        <button onClick={handleBtnClick} data-value={"3/4"}>
          3/4
        </button>
        <button onClick={handleBtnClick} data-value={"4/4"}>
          4/4
        </button>
      </div>
      <div>
        <button onClick={handleBtnClick} data-value={"3/8"}>
          3/8
        </button>
        <button onClick={handleBtnClick} data-value={"6/8"}>
          6/8
        </button>
        <button onClick={handleBtnClick} data-value={"9/8"}>
          9/8
        </button>
        <button onClick={handleBtnClick} data-value={"12/8"}>
          12/8
        </button>
      </div>
    </div>
  );
};

export default TimeSignature;
