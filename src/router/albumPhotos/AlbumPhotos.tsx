import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { imagesApi } from "../../apis/imagesApi";
import { storageApi } from "../../apis/storageApi";
import { albumApi } from "../../apis/albumApi";
// import OnePhoto from "../photos/OnePhoto";
import OneGridPhoto from "../../features/photo/OneGridPhoto";
import { Photo, PresignedDownloadUrl } from "../../types";
import PageLoader from "../../components/pageLoader/PageLoader";
import GridWrapper from "../../common/gridWrapper/GridWrapper";
import { setBreadcrumsSteps } from "../../store/slices/breadcrumsSlice";
import { setAlertBoxMsg } from "../../store/slices/alertBoxSlice";

function AlbumPhotos() {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [imageSources, setImageSources] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (albumId) {
      fetchPhotos();
      fetchAlbumDetails(albumId);
    }

    return () => {
      dispatch(
        setBreadcrumsSteps([])
      )
    }
  }, [albumId]);

  const fetchPhotos = async () => {
    try {
      const response = await imagesApi.fetchImagesForAlbum(albumId as string);
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

  const fetchAlbumDetails = async (albumId: string) => {
    try {
      const response = await albumApi.fetchAlbumDetailsById(albumId);

      const albumName = response.data.albumName;

      dispatch(
        setBreadcrumsSteps(["Albums", albumName])
      )
    } catch (error: any) {
      dispatch(
        setAlertBoxMsg({
          alertMsgText: String(error.message),
          alertMsgType: "error",
        })
      )
    }
  }

  const onToggleFavorite = async (photoId: string, isFavorite: boolean) => {
    try {
      await imagesApi.toggleMarkImageAsFavorite(
        photoId,
        // "isFavorite",
        isFavorite
      );

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId ? { ...photo, isFavorite } : photo
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
    <GridWrapper>
      {photos.map((photo) => (
        <div
          // style={{ padding: "5px" }}
          key={photo._id}
        >
          <OneGridPhoto
            onClick={() => showOnePhoto(photo._id)}
            toggleFavorite={(newVal: boolean) =>
              onToggleFavorite(photo._id, newVal)
            }
            src={imageSources[photo._id]}
            isFavorite={photo.isFavorite}
          />
        </div>
      ))}
    </GridWrapper>
  );
}

export default AlbumPhotos;
