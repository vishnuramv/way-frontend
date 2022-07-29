export const BASE_URL = "http://localhost:8080/api/v1/"
export const axiosConfig = {
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}