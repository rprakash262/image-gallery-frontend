interface OneAlbumProps {
  albumName: string;
  onClick: () => void;
}

function OneGridAlbum({ albumName, onClick }: OneAlbumProps) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "200px",
        height: "230px",
        cursor: "pointer",
      }}
    >
      <img
        src="/assets/album-thumbnail.webp"
        style={{
          width: "100%",
          borderRadius: "7px",
        }}
      />
      <p style={{ textAlign: "center" }}>{albumName}</p>
    </div>
  );
}

export default OneGridAlbum;
