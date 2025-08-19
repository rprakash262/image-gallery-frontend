import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";

import { Photo, PresignedDownloadUrl } from "../../types";
import { storageApi } from "../../apis/storageApi";
import { imagesApi } from "../../apis/imagesApi";
import { RootState } from "../../store";
import Button from "../../components/UI/button/Button";
import Checkbox from "../../components/UI/checkbox/Checkbox";
import { setAlertBoxMsg } from "../../store/slices/alertBoxSlice";
import { setBreadcrumsSteps } from "../../store/slices/breadcrumsSlice";

interface Image extends Photo {
  signedUrl: string;
}

export const ViewOnePhoto = () => {
  const allAlbums = useSelector((state: RootState) => state.albums.allAlbums);
  const { photoId } = useParams();
  const [image, setImage] = useState<Image | null>(null);
  const [selectedAlbumIds, setSelectedAlbumIds] = useState<string[]>([]);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchImageById();
    dispatch(
      setBreadcrumsSteps(["Photo"])
    )

    return () => {
      dispatch(
        setBreadcrumsSteps([])
      )
    }
  }, []);

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
    setIsLoadingImage(false);
  };

  const toggleFavorite = async (
    photoId: string | undefined,
    isFavorite: boolean
  ) => {
    if (photoId) {
      try {
        await imagesApi.toggleMarkImageAsFavorite(
          photoId,
          isFavorite
        );

        setImage({
          ...image,
          isFavorite,
        } as Image);

        const alertMsgText = isFavorite ? "Photo added to favorite." : "Photo removed from favorite.";

        dispatch(
          setAlertBoxMsg({
            alertMsgText,
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
    try {
      await imagesApi.updateImageAlbums(image?._id!, selectedAlbumIds);
      dispatch(
        setAlertBoxMsg({
          alertMsgText: "Album updated successfully.",
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
  };

  return isLoadingImage ? null : (
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
      </div>
      <div
        style={{
          width: "40%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <h4 style={{ textAlign: "center", fontSize: "18px" }}>Add to albums:</h4>
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          {allAlbums.map((album) => (
            <div
              key={album._id}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              {album.albumName}
              <Checkbox
                checked={selectedAlbumIds.includes(album._id)}
                style={{ marginRight: "10px" }}
                onChange={() => onAlbumSelect(album._id)}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            btnType="primary"
            label="Update"
            onClick={addToAlbums}
          />
          <Button
            btnType="primary"
            label={image?.isFavorite ?
              <IconHeartFilled size={22} /> :
              <IconHeart size={22} />
            }
            style={{ width: "48px", padding: "5px", }}
            onClick={image?.isFavorite ? unMarkFavorite : markFavorite}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}></div>
      </div>
    </div>
  );
};
