import axios from "axios";


export const postImage = (
    image: File
): Promise<any> => {
    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
    };

    const formData = new FormData();
    formData.append("file", image);

    return axios.post(
        process.env.REACT_APP_API_URL + "/images/upload",
        formData,
        config
    );
};