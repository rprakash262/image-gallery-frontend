import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const navbarItems = [
  {
    id: 1,
    title: "Photos",
    route: "/photos",
  },
  {
    id: 2,
    title: "Albums",
    route: "/albums",
  },
  {
    id: 3,
    title: "Favorites",
    route: "/favorites",
  },
  // {
  //   id: 4,
  //   title: "+ New Photo",
  //   route: "/new-photo",
  // },
  // {
  //   id: 5,
  //   title: "+ New Album",
  //   route: "/new-album",
  // },
];

const navbarItemStyles = {
  width: "100%",
  height: "50px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "25px",
  cursor: "pointer",
};

function OneNavbarItem({ title, onClick, isActive }: any) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      style={{
        ...navbarItemStyles,
        backgroundColor: isActive || hovered ? "#272727" : "",
      }}
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h4>{title}</h4>
    </div>
  );
}

// function NewItemBtn({ onClick, label }: any) {
//   const [hovered, setHovered] = useState<boolean>(false);

//   return (
//     <div
//       onMouseOver={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{ ...navbarItemStyles, backgroundColor: hovered ? "#272727" : "" }}
//       onClick={onClick}
//     >
//       <h4>{label}</h4>
//     </div>
//   );
// }

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div style={{ padding: "10px", width: "240px" }}>
      {navbarItems.map((item) => (
        <OneNavbarItem
          key={item.id}
          title={item.title}
          isActive={
            pathname === item.route ||
            (item.route === "/photos" && pathname === "/")
          }
          onClick={() => navigate(item.route)}
        />
      ))}
      {/* <NewItemBtn onClick={() => navigate("/new-photo")} label="+ New Photo" /> */}
      {/* <NewItemBtn onClick={() => navigate("/new-album")} label="+ New Album" /> */}
    </div>
  );
}

export default Navbar;
