import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { albumApi } from "../../apis/albumApi";
// import OneAlbum from "./OneAlbum";
import OneGridAlbum from "../../features/album/OneGridAlbum";
import GridWrapper from "../../common/gridWrapper/GridWrapper";
import { Album } from "../../types";
import { imagesApi } from "../../apis/imagesApi";
import { useNavigate } from "react-router";
import PageLoader from "../../components/pageLoader/PageLoader";
import NewItemFloatingBtn from "../../components/newItemFloatingBtn/NewItemFloatingBtn";
import { setBreadcrumsSteps } from "../../store/slices/breadcrumsSlice";

function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAlbums();

    dispatch(
      setBreadcrumsSteps(["Albums"])
    )

    return () => {
      dispatch(
        setBreadcrumsSteps([])
      )
    }
  }, []);

  const fetchAlbums = async () => {
    const response = await albumApi.getAlbums();

    setAlbums(response.data);
    setIsLoading(false);
  };

  const onAlbumClick = async (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const navigateToNewAlbum = () => {
    navigate("/new-album");
  };

  return isLoading ? (
    <PageLoader />
  ) : (
    <GridWrapper>
      {albums.map((album) => (
        <div
          // style={{ padding: "5px" }}
          key={album._id}
        >
          <OneGridAlbum
            albumName={album.albumName}
            onClick={() => onAlbumClick(album._id)}
          />
        </div>
      ))}
      <NewItemFloatingBtn onClick={navigateToNewAlbum} />
    </GridWrapper>
  );
}

export default Albums;
