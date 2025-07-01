import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

// import TextInput from "../../components/UI/textInput/TextInput";
import { Photo, PresignedDownloadUrl } from "../../types";
import { storageApi } from "../../apis/storageApi";
import { imagesApi } from "../../apis/imagesApi";
// import { albumApi } from "../../apis/albumApi";
// import Select from "../../components/UI/select/Select";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Button from "../../components/UI/button/Button";

interface Image extends Photo {
  signedUrl: string;
}

export const ViewOnePhoto = () => {
  const allAlbums = useSelector((state: RootState) => state.albums.allAlbums);
  const { photoId } = useParams();
  const [image, setImage] = useState<Image | null>(null);
  // const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumIds, setSelectedAlbumIds] = useState<string[]>([]);
  // const [albumSearchText, setAlbumSearchText] = useState<string>("");

  useEffect(() => {
    fetchImageById();
  }, []);

  // useEffect(() => {
  // fetchAlbums();
  // searchAlbum(albumSearchText);
  // }, [albumSearchText]);

  const fetchImageById = async () => {
    const response = await imagesApi.fetchImageById(photoId as string);
    const urlKey = response.data.urlKey;
    const response2 = await storageApi.fetchImagesUrl([urlKey]);
    const imageUrlsData: PresignedDownloadUrl[] = response2.data;

    const img = {
      ...response.data,
      signedUrl: imageUrlsData[0].signedUrl,
    };
    setImage(img);
    setSelectedAlbumIds(img.album);
  };

  // const fetchAlbums = async () => {
  //   const response = await albumApi.getAlbums();

  //   setAlbums(response.data);
  // };

  // const searchAlbum = async (query: string) => {
  //   const response = await albumApi.searchAlbums(query);
  // };

  const toggleFavorite = async (
    photoId: string | undefined,
    isFavorite: boolean
  ) => {
    if (photoId) {
      try {
        await imagesApi.toggleMarkImageAsFavorite(
          photoId,
          // "isFavorite",
          isFavorite
        );

        setImage({
          ...image,
          isFavorite,
        } as Image);
      } catch (error) {}
    }
  };

  const markFavorite = (e: any) => {
    e.stopPropagation();
    toggleFavorite(photoId, true);
  };

  const unMarkFavorite = (e: any) => {
    e.stopPropagation();
    toggleFavorite(photoId, false);
  };

  const onAlbumSelect = (albumId: string) => {
    setSelectedAlbumIds((prev) => {
      const newVal = prev.includes(albumId)
        ? prev.filter((id) => id !== albumId)
        : [...prev, albumId];
      return newVal;
    });
  };

  const addToAlbums = async () => {
    await imagesApi.updateImageAlbums(image?._id!, selectedAlbumIds);
  };

  return (
    <div
      style={{
        padding: "10px",
        boxSizing: "border-box",
        overflowY: "scroll",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{ width: "fit-content", margin: "auto", position: "relative" }}
      >
        <img
          style={{ display: "block", margin: "auto", maxWidth: "100%" }}
          src={image?.signedUrl}
          alt="image"
        />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          {image?.isFavorite ? (
            <IconHeartFilled
              size={24}
              color="var(--primary-color)"
              onClick={unMarkFavorite}
              cursor="pointer"
            />
          ) : (
            <IconHeart
              size={24}
              color="var(--primary-color)"
              onClick={markFavorite}
              cursor="pointer"
            />
          )}
        </div>
      </div>
      <div
        style={{
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-around",
          // alignItems: "center",
          width: "40%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <p>Add to favorite</p>
          {image?.isFavorite ? (
            <IconHeartFilled size={24} color="var(--primary-color)" onClick={unMarkFavorite} />
          ) : (
            <IconHeart size={24} color="var(--primary-color)" onClick={markFavorite} />
          )}
        </div> */}
        <p>Add to albums:</p>
        {allAlbums.map((album) => (
          <div key={album._id}>
            <input
              type="checkbox"
              checked={selectedAlbumIds.includes(album._id)}
              style={{ marginRight: "10px" }}
              onChange={() => onAlbumSelect(album._id)}
            />
            {album.albumName}
          </div>
        ))}
        <Button btnType="primary" label="Update" onClick={addToAlbums} />
        <div style={{ display: "flex", flexDirection: "row" }}></div>
        {/* <TextInput
            value={albumSearchText}
            onChange={(e) => setAlbumSearchText(e.target.value)}
          /> */}
      </div>
    </div>
  );
};
