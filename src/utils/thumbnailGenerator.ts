async function generateThumbnail(file: File, maxSize = 200) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e?.target?.result as any;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.7
      ); // quality: 0.7
    };

    reader.readAsDataURL(file);
  });
}

// const thumbnailUrl = originalUrl.replace('/images/', '/thumbnails/');
