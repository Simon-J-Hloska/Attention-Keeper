import { useState } from "react";
import { Stack, Title, Button, Group, Box } from "@mantine/core";
import { videos } from "../componets/videos.ts";
import VideoPlayer from "../componets/VideoPlayer.tsx";

export default function VideosPage() {
    const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const selectedVideo = videos.find((v) => v.id === selectedVideoId);

    return (
        <Stack p="md" style={{ height: "100vh" }}>
            {!isPlaying && (
                <>
                    <Title order={2}>Videos</Title>

                    {/* Video selection buttons */}
                    <Group>
                        {videos.map((video) => (
                            <Button
                                key={video.id}
                                variant={selectedVideoId === video.id ? "filled" : "outline"}
                                onClick={() => {
                                    setSelectedVideoId(video.id);
                                    setIsPlaying(false);
                                }}
                            >
                                {video.title}
                            </Button>
                        ))}
                    </Group>
                </>
            )}

            {/* Fullscreen video player */}
            {selectedVideo &&
                <Box
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <VideoPlayer
                        key={selectedVideo.id}
                        videoId={selectedVideo.id}
                        title={selectedVideo.title}
                        src={selectedVideo.src}
                        autoPlay
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => {
                            setIsPlaying(false)
                            setSelectedVideoId(null);
                        }
                    }
                    />
                </Box>
            }
        </Stack>
    );
}