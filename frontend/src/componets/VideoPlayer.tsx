import { useEffect, useRef, useState } from "react";
import { Card } from "@mantine/core";
import {useApi} from "../api/useApi.ts";

type Props = {
    src: string;
    title: string;
    videoId: number; //
};

export default function VideoPlayer({ src, title}: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [sessionId, setSessionId] = useState<number | null>(null);
    // @ts-ignore
    const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

    const api = useApi();
    const user = localStorage.getItem("user_name");

    const startSession = async () => {
        if (!user) return;

        try {
            const { data } = await api.post("/session/start", {
                user_name: user,
                service_name: "VideoPlatform",
                video_name: title,
            });

            setSessionId(data.session_id);
            
            heartbeatRef.current = setInterval(sendHeartbeat, 5000);
        } catch (err) {
            console.error("Failed to start session:", err);
        }
    };

    const sendHeartbeat = async () => {
        if (!sessionId) return;

        try {
            await api.post("/session/heartbeat", { session_id: sessionId });
        } catch (err) {
            console.error("Heartbeat failed:", err);
        }
    };

    const endSession = async () => {
        if (!sessionId) return;

        if (heartbeatRef.current) {
            clearInterval(heartbeatRef.current);
            heartbeatRef.current = null;
        }

        try {
            await api.post("/session/end", { session_id: sessionId });
        } catch (err) {
            console.error("Failed to end session:", err);
        }

        setSessionId(null);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            if (!sessionId) startSession();
        };

        const handlePause = () => {
            endSession();
        };

        const handleEnded = () => {
            endSession();
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
            endSession();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    return (
        <Card className="max-w-xl mx-auto mt-6">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            <video ref={videoRef} controls className="w-full rounded-lg">
                <source src={src} type="video/mp4" />
            </video>
        </Card>
    );
}