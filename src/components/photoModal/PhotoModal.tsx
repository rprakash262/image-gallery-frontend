import { IconHeart } from "@tabler/icons-react";
import { useParams, useSearchParams } from "react-router";
import TextInput from "../UI/textInput/TextInput";
import { useEffect, useState } from "react";
import { imagesApi } from "../../apis/imagesApi";
import { storageApi } from "../../apis/storageApi";
import { PresignedDownloadUrl } from "../../types";

function PhotoModal() {
  // const [params, setParams] = useSearchParams();
  const [image, setImage] = useState<any>();
  // const query = params.get("id");
  // console.log({ query });

  useEffect(() => {
    fetchImageById();
  }, []);

  const fetchImageById = async () => {
    const response = await imagesApi.fetchImageById("6820c0cc007934f1e8051f30");
    const urlKey = response.data.urlKey;
    console.log({ urlKey });
    const response2 = await storageApi.fetchImagesUrl([urlKey]);
    const imageUrlsData: PresignedDownloadUrl[] = response2.data;
    console.log({ imageUrlsData });
    const data: any = {};
    const img = {
      ...image,
      signedUrl: imageUrlsData[0].signedUrl,
    };
    setImage(img);
    // imageUrlsData.forEach((item, index: number) => {
    //   data[response.data._id] = item.signedUrl;
    // });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000a6",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "80%",
          border: "1px solid white",
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          boxSizing: "border-box",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={image?.signedUrl} alt="image" />
        </div>
        <div style={{ width: "50%" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>Add to favorite</p>
            <IconHeart size={24} color="red" />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>Add to album</p>
            <TextInput value="" onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoModal;
