import axios from "axios";

export const postSignUp = (email: string, password: string): Promise<any> => {
  return axios.post(process.env.REACT_APP_API_URL + "/auth/signup", {
    email,
    password,
  });
};
