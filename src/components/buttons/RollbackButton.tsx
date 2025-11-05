import { useBarStore } from "../../utils/store";

const RollbackButton = () => {
  const removeNote = useBarStore((state) => state.removeNote);

  const handleBtnClick = () => {
    removeNote();
  };

  return <button onClick={handleBtnClick}>노트 지우기</button>;
};

export default RollbackButton;
