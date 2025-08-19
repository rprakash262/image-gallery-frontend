import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { albumApi } from "../../apis/albumApi";
import OneAlbum from "./OneAlbum";
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
    // const response = await imagesApi.fetchImagesForAlbum(albumId)

    // const data = response.data[0];

    // navigate(`/photo/${data._id}`)
    navigate(`/album/${albumId}`);
  };

  const navigateToNewAlbum = () => {
    navigate("/new-album");
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
        // gridTemplateColumns: "auto auto auto",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gap: "20px",
        padding: "10px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {albums.map((album) => (
        <div style={{ padding: "5px" }} key={album._id}>
          <OneAlbum
            albumName={album.albumName}
            onClick={() => onAlbumClick(album._id)}
          />
        </div>
      ))}
      <NewItemFloatingBtn onClick={navigateToNewAlbum} />
    </div>
  );
}

export default Albums;
