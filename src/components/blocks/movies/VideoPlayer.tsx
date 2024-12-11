/** Vendor */
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import screenfull from "screenfull";
import { twMerge } from "tailwind-merge";

/** Local */
import PlayIcon from "@/assets/icons/play_white.svg";
import PauseIcon from "@/assets/icons/pause_white.svg";
import MuteIcon from "@/assets/icons/mute_white.svg";
import UnmuteIcon from "@/assets/icons/unmute_white.svg";
import FullScreenIcon from "@/assets/icons/fullscreen_white.svg";
import InlineIcon from "@/assets/icons/inline_white.svg";

/** Blocks */
import { Button } from "@/components/ui/Button.tsx";

/** Type */
type ProgressDataType = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

type VideoPlayerType = {
  file: string;
  poster: string;
  autoplay?: boolean;
  enableFullScreen?: boolean;
  className?: string;
};

/**
 * VideoPlayer component, extended from react-player and screenfull libraries.
 * Custom controls are needed because default controls interfere with full screen mode.
 * Safari on IOS is not supported for full screen mode, so this defaults to the native controls.
 */

/** Component */
const VideoPlayer = ({ file, poster, autoplay = false, enableFullScreen = false, className }: VideoPlayerType) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const reactPlayerRef = useRef<ReactPlayer | null>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [startedPlaying, setStartedPlaying] = useState(autoplay);
  const [playedRatio, setPlayedRatio] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [loadedSeconds, setLoadedSeconds] = useState(0);
  const [muted, setMuted] = useState(autoplay);
  const [isIOSMobile, setIsIOSMobile] = useState<null | boolean>(null);

  const classes = twMerge("h-full w-full", className, "relative");

  useEffect(() => {
    setIsIOSMobile(/iPhone/i.test(navigator.userAgent));
  }, []);

  /** Effects */
  useEffect(() => {
    if (!screenfull.isEnabled) return;

    const handleFullscreenChange = () => {
      if (screenfull.isFullscreen) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    if (enableFullScreen) {
      screenfull.on("change", handleFullscreenChange);
    }

    return () => {
      screenfull.off("change", handleFullscreenChange);
    };
  }, [enableFullScreen, isFullScreen]);

  /** Helpers */
  const requestFullScreen = () => {
    if (screenfull.isEnabled && enableFullScreen && playerRef.current) {
      try {
        screenfull.request(playerRef.current);
      } catch (error) {
        console.log("Error while requesting to enter full screen", error);
      }
    }
  };

  const handleProgress = (progressData: ProgressDataType) => {
    setPlayedRatio(progressData.played);
    setPlayedSeconds(Math.round(progressData.playedSeconds));
    setLoadedSeconds(Math.round(progressData.loadedSeconds));
  };

  const handlePlay = () => {
    if (!enableFullScreen) return;
    requestFullScreen();
  };

  const handleStartPlaying = () => {
    setIsPlaying(true);
    setStartedPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /** Markup */
  return (
    <div ref={playerRef} className={classes}>
      <ReactPlayer
        ref={reactPlayerRef}
        className="!h-full !w-full"
        width="100%"
        url={file}
        volume={1}
        muted={muted}
        light={autoplay ? "" : poster}
        playing={isPlaying}
        onStart={() => handlePlay()}
        onPlay={() => handlePlay()}
        onClickPreview={() => handleStartPlaying()}
        onProgress={(progressData: ProgressDataType) => handleProgress(progressData)}
      />

      {/* Custom controls */}
      {!isIOSMobile && startedPlaying && (
        <div className="absolute bottom-2 inset-x-[15px] flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              {/* Play / Pause */}
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                icon={isPlaying ? PauseIcon : PlayIcon}
                variant="icon"
                className="w-[49px]"
              />

              {/* Time */}
              <p className="flex gap-[2px] h-fit">
                <span>{formatTime(playedSeconds)}</span>
                <span>/</span>
                <span>{formatTime(loadedSeconds)}</span>
              </p>
            </div>

            <div className="flex">
              {/* Mute / Unmute */}
              <Button onClick={() => setMuted(!muted)} icon={muted ? MuteIcon : UnmuteIcon} variant="icon" />

              {/* Full screen / Inline */}
              <Button
                onClick={screenfull.isFullscreen ? screenfull.exit : requestFullScreen}
                icon={screenfull.isFullscreen ? InlineIcon : FullScreenIcon}
                variant="icon"
              />
            </div>
          </div>

          {/* Progress bar */}
          <input
            className="h-[10px] w-full"
            id="react-player-progress-bar"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={playedRatio}
            onChange={(e) => {
              reactPlayerRef.current.seekTo(e.target.value);
            }}
            style={{
              background: `linear-gradient(to right, #fff ${playedRatio * 100}%, #505050 ${playedRatio * 100}%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export { VideoPlayer };
