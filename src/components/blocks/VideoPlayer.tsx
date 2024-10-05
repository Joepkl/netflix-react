/** Vendor */
import ReactPlayer from "react-player/file";

/** Local */
import IntroVideo from "../../../public/wb_intro.mp4";

/** Type */
type VideoPlayerType = {
  file: string;
  poster: string;
};

/** Component */
const VideoPlayer = ({ file = IntroVideo, poster }: VideoPlayerType) => {
  return (
    <ReactPlayer
      className="!h-fit aspect-video rounded overflow-hidden"
      width="100%"
      url={file}
      light={poster}
      playing={true}
      controls
    />
  );
};

export { VideoPlayer };
