import VideoCard from "../components/VideoCard";

const VideosPage = () => {
    const user = localStorage.getItem("user_name");
    const videos = [{id: 1}];

    if (!user) {
        window.location.href = "/";
        return null;
    }

    return (
        <div>
            <h1>Videa</h1>
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};
