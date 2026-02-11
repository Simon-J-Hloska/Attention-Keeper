import axios from "axios";

const API = "http://localhost:8000/api";

export const startTimer = async (videoId: number) => {
    const user = localStorage.getItem("user_name");

    return axios.post(`${API}/timer/start`, {
        user_name: user,
        video_id: videoId,
    });
};

export const endTimer = async (videoId: number) => {
    const user = localStorage.getItem("user_name");

    return axios.post(`${API}/timer/end`, {
        user_name: user,
        video_id: videoId,
    });
};

export const getScoreboard = async (videoId: number) => {
    return axios.get(`${API}/scoreboard/${videoId}`);
};
