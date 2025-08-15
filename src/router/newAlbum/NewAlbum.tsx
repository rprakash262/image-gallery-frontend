import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import FormControl from "../../components/UI/formControl/FormControl";
import Button from "../../components/UI/button/Button";
import { albumApi } from "../../apis/albumApi";
import { setAlertBoxMsg } from "../../store/slices/alertBoxSlice";

function NewAlbum() {
  const dispatch = useDispatch<AppDispatch>();
  const [albumName, setAlbumName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const saveAlbum = async () => {
    try {
      setIsSaving(true);
      await albumApi.createNewAlbum(albumName);

      setAlbumName("");
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Album created",
          alertMsgType: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setAlertBoxMsg({
          alertMsgText: String(error.message),
          alertMsgType: "error",
        })
      );
    }

    setIsSaving(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "50px" }}>Create a new album</h2>
      <div style={{ width: "35%" }}>
        <FormControl
          label="Album Name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button
          label="Create"
          btnType="primary"
          isDisabled={isSaving}
          onClick={saveAlbum}
        />
      </div>
    </div>
  );
}

export default NewAlbum;
