/** Vendor */
import ReactPlayer from "react-player/file";

/** Type */
type VideoPlayerType = {
  file: string;
  poster: string;
};

/** Component */
const VideoPlayer = ({ file, poster }: VideoPlayerType) => {
  return <ReactPlayer className="!h-fit aspect-video" width="100%" url={file} light={poster} playing={true} controls />;
};

export { VideoPlayer };
