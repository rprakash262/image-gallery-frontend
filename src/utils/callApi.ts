interface CallApiProps {
  URL: string | URL;
  METHOD?: string;
  HEADERS?: any;
  BODY?: any;
  SIGNAL?: AbortSignal;
}

export const CallAPI = async ({
  URL,
  METHOD,
  BODY,
  HEADERS,
  SIGNAL,
}: CallApiProps) => {
  const response = await fetch(URL, {
    method: METHOD || "get",
    headers: {
      "content-type": "application/json",
      ...HEADERS,
    },
    body: BODY,
    signal: SIGNAL,
    credentials: "include",
  });

  if (response.status === 401) {
    localStorage.removeItem("image-gallery");
    window.location.reload();
    return;
  }

  const jsonResponse = response.json();

  return jsonResponse;
};
