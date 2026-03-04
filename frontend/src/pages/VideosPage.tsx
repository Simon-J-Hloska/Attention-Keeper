import {videos} from "../componets/videos.ts";
import VideoCard from "../componets/VideoCard.tsx";

export default function VideosPage() {
  const user = localStorage.getItem("user_name")

  if (!user) {
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Videos</h1>

      {videos.map((video: { id: any }) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}