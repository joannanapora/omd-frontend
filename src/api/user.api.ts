import axios from "axios";

export const getUser = (): Promise<any> => {
    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
    };
    return axios.get(process.env.REACT_APP_API_URL + "/user", config);
};


export const patchUser = (name: string, surname: string, phoneNumber: number, postCode: string): Promise<any> => {
    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
    };
    return axios.patch(process.env.REACT_APP_API_URL + "/user", {
        name,
        surname,
        phoneNumber,
        postCode
    }, config);
};
