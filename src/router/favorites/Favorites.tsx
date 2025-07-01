import { useEffect, useState } from "react";
import { Photo, PresignedDownloadUrl } from "../../types";
import OnePhoto from "../photos/OnePhoto";
import { imagesApi } from "../../apis/imagesApi";
import { storageApi } from "../../apis/storageApi";
import { useNavigate } from "react-router";
import PageLoader from "../../components/pageLoader/PageLoader";

function Favorites() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [imageSources, setImageSources] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await imagesApi.fetchFavoriteImages();
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
        // "isFavorite",
        isFavorite
      );

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId ? { ...photo, isFavorite: isFavorite } : photo
        )
      );
    } catch (error) {}
  };

  const showOnePhoto = (photoId: string) => {
    navigate(`/photo/${photoId}`);
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
        gridTemplateColumns: "auto auto auto",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {photos.map((photo) => (
        <div style={{ padding: "5px" }} key={photo._id}>
          <OnePhoto
            onClick={() => showOnePhoto(photo._id)}
            toggleFavorite={(newVal: boolean) =>
              onToggleFavorite(photo._id, newVal)
            }
            src={imageSources[photo._id]}
            isFavorite={photo.isFavorite}
          />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
