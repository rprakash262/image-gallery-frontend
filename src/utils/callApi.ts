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
  try {
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

    const jsonResponse = await response.json();

    // Throw error if backend says success = false
    if (!response.ok || jsonResponse.success === false) {
      throw new Error(jsonResponse.message || "Something went wrong");
    }

    return jsonResponse;

    return jsonResponse;
  } catch (error) {
    // Network error OR backend error
    console.error("API Error:", error);
    throw error; // Let caller handle it in try/catch
  }
};
