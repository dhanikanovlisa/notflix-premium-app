export const getAPI = async (url: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REST_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const postAPI = async (url: string, data: any) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REST_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const putAPI = async (url: string, data: any) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REST_URL}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      }, body: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const deleteAPI = async (url: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REST_URL}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response;

  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

