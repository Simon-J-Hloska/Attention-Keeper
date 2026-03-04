import axios, {type AxiosInstance } from "axios";
import { useMemo } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export const useApi = (): AxiosInstance => {
    return useMemo(() => {
        const instance = axios.create({
            baseURL: API,
            headers: {
                "Content-Type": "application/json",
            },
        });

        instance.interceptors.request.use((config) => {
            const user = localStorage.getItem("user_name");
            if (user) {
                config.headers.authorization = `Bearer ${user}`;
            }
            return config;
        });

        return instance;
    }, []);
};