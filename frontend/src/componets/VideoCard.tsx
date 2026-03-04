import VideoPlayer from "./VideoPlayer.tsx"

export default function VideoCard({ video }: any) {
  return (
    <VideoPlayer
      src={`/videos/${video.file}`}
      title={video.title}
    />
  )
}