import { apiServerUrl } from "../../constants";
import { CallAPI } from "../utils/callApi";

export const storageApi = {
  fetchImagesUrl: async function (urlKeys: string[]) {
    const response = await fetch(
      "http://localhost:5000/api/v1/storage/presigned-url",
      {
        method: "post",
        body: JSON.stringify({
          urlKeys,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const jsonResponse = await response.json();

    return jsonResponse;
  },
  getPresignedUploadUrl: async function (fileName: string) {
    const url = new URL(`${apiServerUrl}/storage/presigned-url/${fileName}`);

    return CallAPI({
      URL: url,
      METHOD: "get",
    });
  },
};
