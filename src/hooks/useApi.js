import axios from "axios";
import { useEffect } from "react";
import api from "../api";
import { useAuth } from "./useAuth";

const useApi = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;
                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/auth/refresh-token`,
                            { refreshToken }
                        );
                        if (response.status === 200) {
                            const { accessToken } = response.data;
                            setAuth({ ...auth, accessToken });
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            return axios(originalRequest);
                        }
                    } catch (error) {
                        console.error("An error occurred:", error);
                        setAuth({});
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth.accessToken]);
    return { api };
};

export default useApi;
