import axios from "axios";


export const getGallery = (queryParams?: any): Promise<any> => {
    let url = process.env.REACT_APP_API_URL + "/gallery";

    if (queryParams) {
        url = url + '?';

        if (queryParams.dogName) {
            url = url + "dogName=" + queryParams.dogName + "&";
        }

        if (queryParams.userId) {
            url = url + "userId=" + queryParams.userId + "&";
        }

        return axios.get(url);
    };

    return axios.get(url);
};

export const postGallery = (
    imageId: string,
    description: string,
    dogName: string,
    date: Date
): Promise<any> => {

    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
    };

    return axios.post(
        process.env.REACT_APP_API_URL + "/gallery",
        {
            imageId,
            description,
            dogName,
            date
        },
        config
    );
};