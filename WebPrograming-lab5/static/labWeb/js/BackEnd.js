
const RESOURSE_URL = `http://localhost:8080/Element`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};

// public functionality

export const getAlllight = async () => {
  const rawResponse = await baseRequest({urlPath: "/all" });

  return await rawResponse.json();
};

export const postlight = (body) => baseRequest({ method: "POST", body });

export const updatelight = (body) =>
  baseRequest({ method: "PATCH", body:body});

export const deletelight = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });

export const findElementById = async (id) =>{
    const element = await baseRequest({urlPath: `?id=${id}`, method:"GET"})

    return await element.json();
}