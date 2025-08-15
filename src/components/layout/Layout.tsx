import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";

import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import { albumApi } from "../../apis/albumApi";
import { setAllAlbums } from "../../store/slices/albumsSlice";
import { AppDispatch } from "../../store";

function Layout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const response = await albumApi.getAlbums();
    dispatch(setAllAlbums(response.data));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "58px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <Header showLogoutBtn={true} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "calc(100vh - 59px)",
        }}
      >
        <div
          style={{
            width: "260px",
            height: "100%",
            borderRight: "1px solid var(--border-color)",
          }}
        >
          <Navbar />
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
