import { IconTrash, IconUpload } from "@tabler/icons-react";
import { useRef } from "react";

function FileInfo({ fileName, fileSize, removeFile }: any) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <IconTrash onClick={removeFile} size={60} stroke={1} />
      <div style={{ marginLeft: "20px" }}>
        <p>File Name: {fileName}</p>
        <p>File Size: {fileSize}bytes</p>
      </div>
    </div>
  );
}

function FileUploader({ file, onChange, removeFile, style }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ ...style, width: "100%" }}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
      />
      <div
        onClick={file ? () => {} : () => fileInputRef.current?.click()}
        style={{
          width: "100%",
          height: "100px",
          border: "2px dashed var(--border-color)",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {file ? (
          <FileInfo
            fileName={file.name}
            fileSize={file.size}
            removeFile={removeFile}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconUpload size={60} stroke={1} />
            <p style={{ fontSize: "14px", marginLeft: "20px" }}>
              Select an image to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
