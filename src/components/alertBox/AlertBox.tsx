import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { removeAlertBoxMsg } from "../../store/slices/alertBoxSlice";
import OneAlertBox from "./OneAlertBox";

function AlertBox() {
  const alertMessagesList = useSelector(
    (state: RootState) => state.alertBox.alertMessagesList
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        bottom: "0",
        height: "auto",
        padding: "10px",
      }}
    >
      {alertMessagesList.map(
        ({ id, alertMsgText, alertMsgType, timeout }: any) => (
          <OneAlertBox
            alertMsgText={alertMsgText}
            alertMsgType={alertMsgType}
            timeout={timeout}
            removeAlertBoxMsg={() => dispatch(removeAlertBoxMsg(id))}
          />
        )
      )}
    </div>
  );
}

export default AlertBox;
