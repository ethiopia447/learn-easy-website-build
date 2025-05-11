
interface VideoEmbedProps {
  youtubeId: string;
  title: string;
}

const VideoEmbed = ({ youtubeId, title }: VideoEmbedProps) => {
  return (
    <div className="video-container mb-6">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
