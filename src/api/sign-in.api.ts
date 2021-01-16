import axios from "axios";

export const postSignIn = (email: string, password: string): Promise<any> => {
  return axios.post(process.env.REACT_APP_API_URL + "/auth/signin", {
    email,
    password,
  });
};
