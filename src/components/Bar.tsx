import { memo, useEffect, useState } from "react";
import {
  DEFAULT_MAX_BEAT,
  DEFAULT_METER,
  DEFAULT_TEMPO,
  type BarProps,
  type Note,
} from "../utils";

type BarArray = Array<Note>;

const Bar = memo(
  ({
    meter = DEFAULT_METER,
    maxBeat = DEFAULT_MAX_BEAT,
    tempo = DEFAULT_TEMPO,
  }: BarProps) => {
    const [barList, setBarList] = useState<BarArray>([]);
    // barList 계산 식

    useEffect(() => {
      console.log(meter, maxBeat, tempo);
    }, []);

    return <div></div>;
  }
);

export default Bar;
