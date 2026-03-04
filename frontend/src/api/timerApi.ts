import { useApi } from "./useApi.ts";

// Custom hook to return timer and scoreboard functions
export const useVideoApi = () => {
    const api = useApi();

    const startTimer = async (videoId: number) => {
        const user = localStorage.getItem("user_name");
        return api.post("/timer/start", {
            user_name: user,
            video_id: videoId,
        });
    };

    const endTimer = async (videoId: number) => {
        const user = localStorage.getItem("user_name");
        return api.post("/timer/end", {
            user_name: user,
            video_id: videoId,
        });
    };

    const getScoreboard = async (videoId: number) => {
        return api.get(`/scoreboard/${videoId}`);
    };

    return { startTimer, endTimer, getScoreboard };
};