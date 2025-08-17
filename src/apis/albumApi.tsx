import { apiServerUrl } from "../constants";
import { CallAPI } from "../utils/callApi";

export const albumApi = {
  createNewAlbum: async function (
    albumName: string,
    albumDescription?: string
  ) {
    const url = new URL(`${apiServerUrl}/albums`);

    return CallAPI({
      URL: url,
      METHOD: "post",
      BODY: JSON.stringify({
        albumName,
        albumDescription,
      }),
    })
  },
  getAlbums: async function () {
    const response = await fetch(`${apiServerUrl}/albums`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    const jsonResponse = await response.json();

    return jsonResponse;
  },
  searchAlbums: async function (query: string) {
    const response = await fetch(
      `${apiServerUrl}/albums?query=${query}`,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );

    const jsonResponse = await response.json();

    return jsonResponse;
  },
  fetchImagesByAlbum: async function (albumId: string) {
    const url = new URL(`${apiServerUrl}/albums/${albumId}`);

    return CallAPI({
      URL: url,
      METHOD: "get",
    });
  },
};
