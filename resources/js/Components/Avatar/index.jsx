import React from "react";

import styles from "./Avatar.module.scss";

const backgrounds = [
  "#FF4081",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#74c69d",
  "#fcbf49",
  "#f8961e",
  "#5390d9",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
];

export const Avatar = ({
  src,
  fullName,
  onClick,
  width,
  height,
}) => {
  const [error, setError] = React.useState(false);
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    if (src) {
      fetch(src, { credentials: "same-origin" })
        .then((res) => {
          if (!res.ok) {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [src]);

  const handleImageError = () => {
    if (imageRef.current && !error) {
      imageRef.current.src = "https://vk.com/images/camera_50.png?ava=1";
      setError(true);
    }
  };

  if (error || !src) {
    const color = backgrounds[fullName.length % backgrounds.length];

    return (
      <div
        style={{
          backgroundColor: color,
          height,
          width,
        }}
        className={styles.letterAvatar}
      >
        {fullName[0].toUpperCase()}
      </div>
    );
  }

  return (
    <img
      width={width}
      height={height}
      onError={handleImageError}
      ref={imageRef}
      src={src || "https://vk.com/images/camera_50.png?ava=1"}
      alt={`Аватар пользователя ${fullName}`}
      onClick={onClick}
    />
  );
};
