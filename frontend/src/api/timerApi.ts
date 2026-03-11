import { useApi } from "./useApi.ts";

export const useVideoApi = () => {
    const api = useApi();

    const startTimer = async (videoId: number) => {
        const user = localStorage.getItem("user_name");

        return api.post("/session/start", {
            user_name: user,
            video_id: videoId,
        });
    };

    const endTimer = async (videoId: number) => {
        const user = localStorage.getItem("user_name");

        return api.post("/session/end", {
            user_name: user,
            video_id: videoId,
        });
    };

    const heartbeat = async (videoId: number) => {
        const user = localStorage.getItem("user_name");

        return api.post("/session/heartbeat", {
            user_name: user,
            video_id: videoId,
        });
    };

    const getLeaderboard = async () => {
        return api.get("/leaderboard");
    };

    return { startTimer, endTimer, heartbeat, getLeaderboard };
};