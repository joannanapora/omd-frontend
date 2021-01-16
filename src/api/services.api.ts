import axios from "axios";

import { Location, Weight } from "../models/enums";

export const getServices = (queryParams?: any): Promise<any> => {
  let url = process.env.REACT_APP_API_URL + "/services?page=1&limit=10";

  if (queryParams) {
    if (queryParams.dogName) {
      url = url + "dogName=" + queryParams.dogName + "&";
    }

    if (queryParams.breed) {
      url = url + "breed=" + queryParams.breed + "&";
    }

    if (queryParams.location) {
      queryParams.location.forEach((l) => {
        url = url + "locations=" + l + "&";
      });
    }

    if (queryParams.weight) {
      queryParams.weight.forEach((w) => {
        url = url + "weights=" + w + "&";
      });
    }
  }

  return axios.get(url);
};

export const postService = (
  dateFrom: string,
  breed: string,
  dogName: string,
  location: Location,
  weight: Weight,
  phoneNumber: string,
  saveAsTemplate: boolean
): Promise<any> => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  };
  return axios.post(
    process.env.REACT_APP_API_URL + "/services",
    {
      dateFrom,
      breed,
      dogName,
      location,
      weight,
      saveAsTemplate,
      phoneNumber
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
