import { useApi } from "./useApi.ts";

export const useVideoApi = () => {
    const api = useApi();

    const startTimer = async (videoId: number) => {
        const user = localStorage.getItem("user_name");

        const res = await api.post("/session/start", {
            user_name: user,
            video_id: videoId.toString(),
        });

        return res.data.session_id;
    };

    const endTimer = async (sessionId: string, videoId: number) => {
        return api.post("/session/end", {
            session_id: sessionId,
            video_id: videoId.toString(),
        });
    };

    const heartbeat = async (sessionId: string, videoId: number) => {
        return api.post("/session/heartbeat", {
            session_id: sessionId,
            video_id: videoId.toString(),
        });
    };

    const getLeaderboard = async () => {
        return api.get("/leaderboard");
    };

    return { startTimer, endTimer, heartbeat, getLeaderboard };
};
