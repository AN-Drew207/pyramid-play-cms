import axios from "axios";

export const HOST = process.env.NEXT_PUBLIC_API_URL;

export const configureAxiosHeaders = (token: string): boolean => {
  try {
    axios.defaults.baseURL = HOST;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    return true;
  } catch (error) {
    console.log(error, "es aqui?");
    return false;
  }
};

export const configureHOST = (): boolean => {
  try {
    axios.defaults.baseURL = HOST;
    return true;
  } catch (error) {
    console.log(error, "es aqui? 2");
    return false;
  }
};
