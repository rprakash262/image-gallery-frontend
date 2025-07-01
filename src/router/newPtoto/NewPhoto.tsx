import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { setAlertBoxMsg } from "../../store/slices/alertBoxSlice";
import FileUploader from "../../components/fileUploader/FileUploader";
import FormControl from "../../components/UI/formControl/FormControl";
import Button from "../../components/UI/button/Button";
import ProgressBar from "../../components/UI/progressBar/ProgressBar";
import { storageApi } from "../../apis/storageApi";
import { imagesApi } from "../../apis/imagesApi";

function NewPhoto() {
  const dispatch = useDispatch<AppDispatch>();
  const [imageName, setImageName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>("0");
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (files: FileList | null) => {
    if (files && files?.length > 0) {
      const file = files[0];
      setFile(file);
      setImageName(file.name);
    }
  };

  const uploadFileWithProgress = (
    file: File,
    signedUrl: string,
    onProgress: (percent: string) => void
  ) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", signedUrl, true);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = (event.loaded / event.total) * 100;
          onProgress(percent.toFixed(2)); // percent as string with 2 decimals
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Upload failed"));
      };

      xhr.send(file);
    });
  };

  const uploadImage = async () => {
    try {
      setIsUploading(true);

      if (file) {
        const presignedUploadUrlResponse =
          await storageApi.getPresignedUploadUrl(file.name);
        const signedUrlData = presignedUploadUrlResponse.data;

        if (signedUrlData.signedUrl) {
          await uploadFileWithProgress(
            file,
            signedUrlData.signedUrl,
            setUploadProgress
          );

          await imagesApi.saveNewImage(file.name, signedUrlData.storageArgs);

          setIsUploading(false);
          setFile(null);
          setImageName("");
          setUploadProgress("0");
          dispatch(
            setAlertBoxMsg({
              alertMsgText: "Image uploaded",
              alertMsgType: "success",
            })
          );
        }
      }
    } catch (error) {
      setIsUploading(false);
      setFile(null);
      setImageName("");
      setUploadProgress("0");
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Error uploadeding image",
          alertMsgType: "error",
        })
      );
    }
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
      <h2 style={{ marginBottom: "50px" }}>Upload a new photo</h2>
      <div style={{ width: "35%" }}>
        <FormControl
          label="Image Name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <FileUploader
          file={file}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFileChange(e.target.files)
          }
          removeFile={() => setFile(null)}
          style={{ marginBottom: "20px" }}
        />
        {isUploading && (
          <ProgressBar
            progress={uploadProgress}
            style={{ marginBottom: "20px" }}
          />
        )}
        <Button
          label={isUploading ? "Please wait..." : "Upload"}
          btnType="primary"
          isDisabled={isUploading}
          onClick={uploadImage}
        />
      </div>
    </div>
  );
}

export default NewPhoto;
