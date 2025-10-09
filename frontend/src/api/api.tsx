import axios from "axios"


const backend_origin = import.meta.env.VITE_BACKEND_ORIGIN

const instance = axios.create({
    baseURL:backend_origin,
    timeout: 20000,
    timeoutErrorMessage: "Error Server took too long to respond"
})


export default instance