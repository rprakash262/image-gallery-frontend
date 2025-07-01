import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

interface OnePhotoProps {
  src: string;
  isFavorite: boolean;
  onClick: () => void;
  toggleFavorite: (val: boolean) => void;
}

function OnePhoto({ src, isFavorite, onClick, toggleFavorite }: OnePhotoProps) {
  const markFavorite = (e: any) => {
    e.stopPropagation();
    toggleFavorite(true);
  };

  const unMarkFavorite = (e: any) => {
    e.stopPropagation();
    toggleFavorite(false);
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: "200px",
        height: "200px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "4px"
        }}
        loading="lazy"
      />
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        {isFavorite ? (
          <IconHeartFilled size={24} color="red" onClick={unMarkFavorite} />
        ) : (
          <IconHeart size={24} color="red" onClick={markFavorite} />
        )}
      </div>
    </div>
  );
}

export default OnePhoto;
