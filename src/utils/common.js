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
export function hasDuplicateStrings(arr) {
  const uniqueSet = new Set(arr);
  return uniqueSet.size !== arr.length;
}
export function findIdenticalIds(strings) {
  const idMap = new Map();

  // Iterate over the strings array to map each string to its index
  strings.forEach((str, index) => {
    if (!idMap.has(str)) {
      idMap.set(str, [index]);
    } else {
      idMap.get(str).push(index);
    }
  });

  // Filter out the IDs of identical strings
  const identicalIds = Array.from(idMap.values()).filter(
    (ids) => ids.length > 1
  );

  // Flatten the array of IDs
  return identicalIds.flat();
}
export const replaceInString = (string, values) => {
  // Iterate through the keys in the values object
  for (const key in values) {
    // Replace all occurrences of the key (wrapped in ":") with the corresponding value
    string = string.replace(`:${key}`, values[key]);
  }
  return string;
};

export const AuthHelpers = {
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN);
  },
  login: (token) => {
    // Add api for login
    localStorage.setItem(AUTH_TOKEN, token);
  },
  signup: () => {
    // addd api for signup
  },
  logout: (type) => {
    if (AuthHelpers.isAuthenticated()) {
      console.log(AuthHelpers.isAuthenticated());
      if (!type) {
        // window.location.href = getAuthRoute();
      } else {
        // redirectToUrl(getAuthRoute());
      }
      localStorage.removeItem(AUTH_TOKEN);
    }
  },
};
