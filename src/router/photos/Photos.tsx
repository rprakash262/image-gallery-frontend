import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { imagesApi } from "../../apis/imagesApi";
import { storageApi } from "../../apis/storageApi";
// import OnePhoto from "./OnePhoto";
import OnePhoto from "../../features/photo/OnePhoto";
import { Photo, PresignedDownloadUrl } from "../../types";
import PageLoader from "../../components/pageLoader/PageLoader";
import NewItemFloatingBtn from "../../components/newItemFloatingBtn/NewItemFloatingBtn";
import { setBreadcrumsSteps } from "../../store/slices/breadcrumsSlice";

function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [imageSources, setImageSources] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPhotos();
    dispatch(setBreadcrumsSteps(["Photos"]))

    return () => {
      dispatch(setBreadcrumsSteps([]));
    }
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await imagesApi.fetchImages();
      const imagesData: Photo[] = response.data;

      const urlKeys = imagesData.map((res) => res.urlKey);

      if (urlKeys?.length > 0) {
        const response2 = await storageApi.fetchImagesUrl(urlKeys);
        const imageUrlsData: PresignedDownloadUrl[] = response2.data;

        const data: any = {};

        imageUrlsData.forEach((item, index: number) => {
          data[imagesData[index]._id] = item.signedUrl;
        });

        setImageSources(data);
        setPhotos(imagesData);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onToggleFavorite = async (photoId: string, isFavorite: boolean) => {
    try {
      await imagesApi.toggleMarkImageAsFavorite(
        photoId,
        isFavorite
      );

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId ? { ...photo, isFavorite } : photo
        )
      );
    } catch (error) {}
  };

  const onDeletePhotoClick = (photoId: string) => {
    //
  }

  const showOnePhoto = (photoId: string) => {
    navigate(`/photo/${photoId}`);
  };

  const navigateToNewPhoto = () => {
    navigate("/new-photo");
  };

  return isLoading ? (
    <PageLoader />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        display: "grid",
        // gridTemplateColumns: "auto auto auto auto",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gap: "20px",
        // gridTemplateColumns: "none",
        padding: "10px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {photos.map((photo) => (
        <div
          // style={{ padding: "5px" }}
          key={photo._id}
        >
          <OnePhoto
            onClick={() => showOnePhoto(photo._id)}
            toggleFavorite={(newVal: boolean) =>
              onToggleFavorite(photo._id, newVal)
            }
            showFavoriteIcon={true}
            showDeleteIcon={true}
            src={imageSources[photo._id]}
            isFavorite={photo.isFavorite}
            onDeletePhotoClick={() => onDeletePhotoClick(photo._id)}
          />
        </div>
      ))}
      <NewItemFloatingBtn onClick={navigateToNewPhoto} />
    </div>
  );
}

export default Photos;
