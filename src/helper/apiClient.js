import axios from "axios";

const apiClient = () => {
   //const MAIN_ENDPOINT = "https://microservice-voting.herokuapp.com/client/";
   // const MAIN_ENDPOINT = "http://192.168.0.213:8080/client/";
   // const MAIN_ENDPOINT = "http://173.242.57.145:8888/";
    const MAIN_ENDPOINT = "/api";
   // const MAIN_ENDPOINT = "http://localhost:8888/";

    return axios.create({
        baseURL: MAIN_ENDPOINT
    });
};

export const getCookie = (c_name) => {
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