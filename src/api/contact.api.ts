import axios from "axios";
import { ContactSubject } from "../models/enums";

export const postContact = (
  message: string,
  subject: ContactSubject
): Promise<any> => {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  };

  return axios.post(
    process.env.REACT_APP_API_URL + "/contacts",
    {
      message: message,
      subject: subject,
    },
    config
  );
};
