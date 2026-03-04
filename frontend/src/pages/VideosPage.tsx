import { useState } from "react";
import { Stack, Title,  Button, Group } from "@mantine/core";
import {videos} from "../componets/videos.ts";
import VideoPlayer from "../componets/VideoPlayer.tsx";

export default function VideosPage() {
    const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);


    const selectedVideo = videos.find((v) => v.id === selectedVideoId);

    return (
        <Stack p="md">
            <Title order={2}>Videos</Title>

            {/* Video selection buttons */}
            <Group >
                {videos.map((video) => (
                    <Button
                        key={video.id}
                        variant={selectedVideoId === video.id ? "filled" : "outline"}
                        onClick={() => setSelectedVideoId(video.id)}
                    >
                        {video.title}
                    </Button>
                ))}
            </Group>

            {/* Video player */}
            {selectedVideo && (
                <VideoPlayer
                    key={selectedVideo.id}
                    videoId={selectedVideo.id}
                    title={selectedVideo.title}
                    src={selectedVideo.src}
                    autoPlay
                />
            )}
        </Stack>
    );
}