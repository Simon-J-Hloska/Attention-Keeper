import { useRef, useState } from "react";
import { Card } from "@mantine/core";
import { useApi } from "../api/useApi";

type Props = {
    src: string;
    title: string;
    videoId: number;
    autoPlay?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
};

export default function VideoPlayer({
                                        src,
                                        title,
                                        autoPlay = false,
                                        onPlay,
                                        onPause
                                    }: Props) {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const heartbeatRef = useRef<any>(null);

    const api = useApi();
    const user = localStorage.getItem("user_name");

    const startSession = async () => {
        if (!user || sessionId) return;

        try {
            const { data } = await api.post("/session/start", {
                user_name: user,
                service_name: "VideoPlatform",
                video_name: title,
            });

            setSessionId(data.session_id);

            heartbeatRef.current = setInterval(() => {
                api.post("/session/heartbeat", { session_id: data.session_id });
            }, 5000);

        } catch (err) {
            console.error("Failed to start session:", err);
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

    const handlePlay = () => {
        startSession();
        onPlay?.();
    };

    const handlePause = () => {
        endSession();
        onPause?.();
    };

    const handleEnded = () => {
        endSession();
        onPause?.();
    };

    return (
        <Card
            style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
                background: "black"
            }}
        >
            <video
                ref={videoRef}
                controls
                autoPlay={autoPlay}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
                style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "contain"
                }}
            >
                <source src={src} type="video/mp4" />
            </video>
        </Card>
    );
}