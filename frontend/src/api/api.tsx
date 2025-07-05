import axios from "axios"

const instance = axios.create({
    baseURL:"http://localhost:5000",
    timeout: 20000,
    timeoutErrorMessage: "Error Server took too long to respond"
})


export default instance