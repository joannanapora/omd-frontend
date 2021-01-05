import axios from "axios";

import { Location, Weight } from "../models/enums";

export const getServices = (queryParams?: any): Promise<any> => {

  let url = process.env.REACT_APP_API_URL + "/services";

  if (queryParams) {
    if (queryParams.dogName) {
      url = url + "?dogName=" + queryParams.dogName + "&";
    }

    if (queryParams.breed) {
      url = url + "?breed=" + queryParams.breed + "&";
    }

    if (queryParams.location) {
      queryParams.location.forEach((l) => {
        url = url + "?locations=" + l + "&";
      });
    }

    if (queryParams.weight) {
      queryParams.location.forEach((l) => {
        url = url + "?weights=" + l + "&";
      });
    }
  }

  return axios.get(url);
};

export const postService = (
  message: string,
  dateFrom: string,
  dateTo: string,
  breed: string,

  dogName: string,
  location: Location,
  weight: Weight,
  saveAsTemplate: boolean
): Promise<any> => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  };
  return axios.post(
    process.env.REACT_APP_API_URL + "/services",
    {
      message,
      dateFrom,
      dateTo,
      breed,

      dogName,
      location,
      weight,
      saveAsTemplate,
    },
    config
  );
};

export const getTemplate = () => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  };
  return axios.get(process.env.REACT_APP_API_URL + "/services/template", config);
};
