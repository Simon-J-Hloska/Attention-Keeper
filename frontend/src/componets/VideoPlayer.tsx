import { useRef } from "react";
import { Card } from "@mantine/core";
import {useVideoApi} from "../api/timerApi.ts";

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

                                        videoId,
                                        autoPlay = false,
                                        onPlay,
                                        onPause
                                    }: Props) {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const heartbeatRef = useRef<any>(null);

    const { startTimer, endTimer, heartbeat } = useVideoApi();

    const startSession = async () => {
        try {
            await startTimer(videoId);

            heartbeatRef.current = setInterval(() => {
                heartbeat(videoId);
            }, 5000);

        } catch (err) {
            console.error("Failed to start session:", err);
        }
    };

    const endSession = async () => {
        if (heartbeatRef.current) {
            clearInterval(heartbeatRef.current);
            heartbeatRef.current = null;
        }

        try {
            await endTimer(videoId);
        } catch (err) {
            console.error("Failed to end session:", err);
        }
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