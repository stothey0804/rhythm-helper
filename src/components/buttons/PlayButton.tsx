import { useGlobalStore } from "../../utils/store";

const PlayButton = () => {
  const isPlaying = useGlobalStore((state) => state.isPlaying);
  const toggleIsPlaying = useGlobalStore((state) => state.toggleIsPlaying);

  return (
    <button onClick={() => toggleIsPlaying()}>
      {isPlaying ? "정지" : "시작"}
    </button>
  );
};

export default PlayButton;
