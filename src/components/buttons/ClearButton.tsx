import { CONFRIM_MSG_BAR_CLEAR_KR } from "../../utils";
import { useBarStore } from "../../utils/store";

const ClearButton = () => {
  const resetBar = useBarStore((state) => state.resetBar);

  const handleBtnClick = () => {
    if (confirm(CONFRIM_MSG_BAR_CLEAR_KR)) {
      resetBar();
    }
  };

  return <button onClick={handleBtnClick}>초기화</button>;
};

export default ClearButton;
