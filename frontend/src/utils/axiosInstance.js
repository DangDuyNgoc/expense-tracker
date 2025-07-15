import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

// get token from the localstorage
const getToken = () => localStorage.getItem("token");

// attach access token
api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, (error) => Promise.reject(error));

// interceptor response: handle error of expired token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if access token expired (403) and refresh yet
        if (error.response?.status === 403 &&
            !originalRequest._retry &&
            error.response?.data?.message?.includes("expired")
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.get(`${API_URL}/user/refresh-token`, {
                    withCredentials: true
                })

                const newAccessToken = res.data.accessToken;

                if (newAccessToken) {
                    localStorage.setItem("token", newAccessToken);

                    // attach new token into old token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // retry request
                    return api(originalRequest);
                }
            } catch (error) {
                console.log("Refresh token failed", error);

                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)

export default api;