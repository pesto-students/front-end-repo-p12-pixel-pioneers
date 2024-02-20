import { AUTH_TOKEN } from "./constants";

export const request = (url, options) => {
  if (options.headers) {
    Object.assign(options.headers, { Accept: "application/json" });
    if (!options.headers.Authorization) {
      options.headers.Authorization = `Bearer ${localStorage.getItem(
        AUTH_TOKEN
      )}`;
    }
  }
  return fetch(url, {
    ...options,
    mode: "cors",
  })
    .then((response) => response.json() || response)
    .then((json) => json)
    .catch((err) => ({ err }));
};
