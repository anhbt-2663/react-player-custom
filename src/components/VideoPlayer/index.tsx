import React, { useState, useRef, ChangeEvent, ReactNode } from "react";
import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import screenFull from "screenfull";

import PlayerControls from "./PlayerControls";

interface PlayerControl {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
}

interface PlayerTime {
  played: number;
}

let count = 0;

const VideoPlayer: React.FC = () => {
  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
  });
  const videoPlayerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer | null>(null);
  const playerControlRef = useRef<HTMLDivElement | null>(null);
  const { playing, muted, volume, played } = playerControl;
  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00: 00";
  const durationTime = playerRef.current
    ? playerRef.current.getDuration()
    : "00: 00";

  const onPlayingVideo = (): void => {
    setPlayerControl({ ...playerControl, playing: !playerControl.playing });
  };

  const onMutedVideo = (): void => {
    const volume = !playerControl.muted ? 0 : 0.5;
    setPlayerControl({
      ...playerControl,
      muted: !playerControl.muted,
      volume,
    });
  };

  const onVolumeChange = (
    _e: ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    const newValue = value as Number;

    setPlayerControl({
      ...playerControl,
      volume: parseFloat(String(+newValue / 100)),
      muted: +newValue === 0 && true,
    });
  };

  const onToggleScreenFull = () => {
    if (videoPlayerContainerRef.current !== null && videoPlayerContainerRef) {
      screenFull.toggle(videoPlayerContainerRef.current);
    }
  };

  const onProgress = (changeState: PlayerTime) => {
    if (count > 3 && playerControlRef.current) {
      playerControlRef.current.style.visibility = "hidden";
      count = 0;
    }

    if (
      playerControlRef.current &&
      playerControlRef.current.style.visibility === "visible"
    ) {
      count += 1;
    }

    if (!playerControl.seeking) {
      setPlayerControl({ ...playerControl, played: changeState.played });
    }
  };

  const onSeekChange = (
    _e: ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    const newValue = value as number;

    setPlayerControl({
      ...playerControl,
      played: parseFloat(String(+newValue / 100)),
    });
  };

  const onSeekMouseDown = (_e: ChangeEvent<{}>) => {
    setPlayerControl({ ...playerControl, seeking: true });
  };

  const onSeekMouseUp = (
    _e: ChangeEvent<{}>,
    value: number | number[]
  ): void => {
    const newValue = value as number;
    if (playerRef.current !== null && playerRef) {
      setPlayerControl({
        ...playerControl,
        played: parseFloat(String(+newValue / 100)),
      });
      playerRef.current.seekTo(newValue / 100);
    }
  };

  const onMouseMove = () => {
    if (playerControlRef.current) {
      playerControlRef.current.style.visibility = "visible";
      count = 0;
    }
  };

  return (
    <VideoPlayerContainer
      ref={videoPlayerContainerRef}
      onMouseMove={onMouseMove}
    >
      <ReactPlayer
        url="https://vjs.zencdn.net/v/oceans.mp4"
        width={"100%"}
        height="100%"
        playing={playing}
        muted={muted}
        volume={volume}
        playsinline
        onProgress={onProgress}
        ref={playerRef}
      />

      <PlayerControls
        ref={playerControlRef}
        playing={playing}
        onPlayingVideo={onPlayingVideo}
        muted={muted}
        onMuted={onMutedVideo}
        volume={volume}
        onVolumeChange={onVolumeChange}
        onToggleScreenFull={onToggleScreenFull}
        played={played}
        onSeekChange={onSeekChange}
        onSeekMouseDown={onSeekMouseDown}
        onSeekMouseUp={onSeekMouseUp}
        currentTime={currentTime}
        durationTime={durationTime}
      />
    </VideoPlayerContainer>
  );
};

const VideoPlayerContainer = styled("div")`
  position: relative;
  width: 100%;
  margin-top: 80px;
`;

export default VideoPlayer;
