import axios from "axios";

const autopillApi = axios.create({
    baseURL: '/api'
});

export default autopillApi;