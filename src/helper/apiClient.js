import axios from "axios";

const apiClient = () => {
    const MAIN_ENDPOINT = "https://microservice-voting.herokuapp.com/";
    // const MAIN_ENDPOINT = "http://localhost:8080/";

    return axios.create({
        baseURL: MAIN_ENDPOINT
    });
};

export const getCookie = (c_name) => {
    console.log("Trying to login in by token from cookie...");
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

export default apiClient