import { AxiosError } from "axios";

export const getInstillApiErrorMessage = (error: AxiosError<any, any>) => {
  if (!error.response) {
    return null;
  }

  if (!error.response.data.details && !error.response.data.message) {
    return null;
  }

  if (error.response.data.details.length === 0) {
    return error.response.data.message;
  }

  return JSON.stringify(error.response?.data.details, null, "\t");
};
