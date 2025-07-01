import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "../components/layout/Layout";
import Photos from "./photos/Photos";
import Albums from "./albums/Albums";
import Favorites from "./favorites/Favorites";
import Register from "./register/Register";
import Login from "./login/Login";
import NewPhoto from "./newPtoto/NewPhoto";
import NewAlbum from "./newAlbum/NewAlbum";
import AlertBox from "../components/alertBox/AlertBox";
// import PhotoModal from "../components/photoModal/PhotoModal";
import { ProtectedRoute } from "./ProtectedRoute";
import { ViewOnePhoto } from "./viewOnePhoto/ViewOnePhoto";
import AlbumPhotos from "./albumPhotos/AlbumPhotos";
import Landing from "./landing/Landing";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Layout />}>
          {/* <Route
            index
            element={
              <ProtectedRoute>
                <Photos />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/photos"
            element={
              <ProtectedRoute>
                <Photos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo/:photoId"
            element={
              <ProtectedRoute>
                <ViewOnePhoto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/album/:albumId"
            element={
              <ProtectedRoute>
                <AlbumPhotos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/albums"
            element={
              <ProtectedRoute>
                <Albums />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-photo"
            element={
              <ProtectedRoute>
                <NewPhoto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-album"
            element={
              <ProtectedRoute>
                <NewAlbum />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/photo" element={<></>} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <PhotoModal /> */}
      <AlertBox />
    </BrowserRouter>
  );
}

export default Router;
