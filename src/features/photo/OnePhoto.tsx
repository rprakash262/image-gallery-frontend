import { useState } from "react";
import { IconHeart, IconHeartFilled, IconTrash } from "@tabler/icons-react";

interface OnePhotoProps {
  src: string;
  isFavorite: boolean;
  onClick: () => void;
  showFavoriteIcon?: boolean;
  showDeleteIcon?: boolean;
  toggleFavorite?: (val: boolean) => void;
  onDeletePhotoClick?: () => void;
}

function OnePhoto({
  src,
  isFavorite,
  onClick,
  showFavoriteIcon,
  toggleFavorite,
  showDeleteIcon,
  onDeletePhotoClick,
}: OnePhotoProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const markFavorite = (e: any) => {
    e.stopPropagation();
    toggleFavorite && toggleFavorite(true);
  };

  const unMarkFavorite = (e: any) => {
    e.stopPropagation();
    toggleFavorite && toggleFavorite(false);
  };

  const deletePhoto = (e: any) => {
    e.stopPropagation();
    onDeletePhotoClick && onDeletePhotoClick();
  }

  return (
    <div
      onClick={onClick}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
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
      {mouseOver && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px"
          }}
        >
          {showFavoriteIcon && (
            <>
              {isFavorite ? (
                <IconHeartFilled
                  size={24}
                  color="var(--primary-color)"
                  onClick={unMarkFavorite}
                />
              ) : (
                <IconHeart
                  size={24}
                  color="var(--primary-color)"
                  onClick={markFavorite}
                />
              )}
            </>
          )}
          {showDeleteIcon && (
            <IconTrash
              size={24}
              color="var(--primary-color)"
              onClick={deletePhoto}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default OnePhoto;
