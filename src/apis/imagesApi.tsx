import { apiServerUrl } from "../constants";
import { CallAPI } from "../utils/callApi";

const baseApiUrl = process.env.API_SERVER_URL;

export const imagesApi = {
  saveNewImage: async function (fileName: string, storageArgs: any) {
    const url = new URL(`${apiServerUrl}/images`);

    return CallAPI({
      URL: url,
      METHOD: "post",
      BODY: JSON.stringify({
        title: fileName,
        urlKey: fileName,
        storageArgs,
      }),
    });
  },
  fetchImages: async function () {
    const url = new URL(`${baseApiUrl}/images?skip=0&count=10`);

    return CallAPI({
      URL: url,
      METHOD: "get",
    });
  },
  fetchImagesForAlbum: async function (albumId: string) {
    const url = new URL(
      `${baseApiUrl}/images/album/${albumId}?skip=0&count=10`
    );

    return CallAPI({
      URL: url,
      METHOD: "get",
    });
  },
  fetchImageById: async function (imageId: string) {
    const url = new URL(`${baseApiUrl}/images/${imageId}`);

    return CallAPI({
      URL: url,
      METHOD: "get",
    });
  },
  fetchFavoriteImages: async function () {
    const url = new URL(`${baseApiUrl}/images/favorite?skip=0&count=10`);

    return CallAPI({
      URL: url,
      METHOD: "get",
    });
  },
  toggleMarkImageAsFavorite: async function (
    imageId: string,
    // fieldName: string,
    fieldVal: any
  ) {
    const url = new URL(`${baseApiUrl}/images/${imageId}`);

    return CallAPI({
      URL: url,
      METHOD: "post",
      BODY: JSON.stringify({
        fieldName: "isFavorite",
        fieldVal,
      }),
    });
  },
  updateImageAlbums: async function (
    imageId: string,
    // fieldName: string,
    fieldVal: any
  ) {
    const url = new URL(`${baseApiUrl}/images/${imageId}`);

    return CallAPI({
      URL: url,
      METHOD: "post",
      BODY: JSON.stringify({
        fieldName: "album",
        fieldVal,
      }),
    });
  },
};
