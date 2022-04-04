import React, { ChangeEvent, forwardRef } from "react";
import styled from "@emotion/styled";
import { Grid, Slider, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PlayerProgressBar from "./ProgressBar";
import PlayerTimes from "./PlayerTime";

interface PlayerControlsProps {
  playing: boolean;
  onPlayingVideo: () => void;
  muted: boolean;
  onMuted: () => void;
  volume: number;
  onVolumeChange: (e: ChangeEvent<{}>, value: number | number[]) => void;
  onToggleScreenFull: () => void;
  played: number;
  onSeekChange: (e: ChangeEvent<{}>, value: number | number[]) => void;
  onSeekMouseDown: (e: ChangeEvent<{}>) => void;
  onSeekMouseUp: (e: ChangeEvent<{}>, value: number | number[]) => void;
  currentTime: string | number;
  durationTime: string | number;
}

const PlayerControls = forwardRef<HTMLDivElement, PlayerControlsProps>(
  (
    {
      playing,
      onPlayingVideo,
      muted,
      onMuted,
      volume,
      onVolumeChange,
      onToggleScreenFull,
      played,
      onSeekChange,
      onSeekMouseDown,
      onSeekMouseUp,
      currentTime,
      durationTime,
    },
    ref
  ) => {
    return (
      <PlayerControlsWrapper onClick={onPlayingVideo} ref={ref}>
        <ControlBarWrapper
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: 16 }}
          >
            <PlayerProgressBar
              onSeekMouseDown={onSeekMouseDown}
              onSeekChange={onSeekChange}
              onSeekMouseUp={onSeekMouseUp}
              played={played}
            />

            <Grid item>
              <Grid container direction="row" alignItems="center">
                <IconButton className="control-icon" onClick={onPlayingVideo}>
                  {playing ? (
                    <PauseIcon fontSize="inherit" />
                  ) : (
                    <PlayArrowIcon fontSize="inherit" />
                  )}
                </IconButton>

                <VolumneContainer>
                  <IconButton className="control-icon" onClick={onMuted}>
                    {muted ? (
                      <VolumeOffIcon fontSize="inherit" />
                    ) : (
                      <VolumeUpIcon fontSize="inherit" />
                    )}
                  </IconButton>

                  <VolumCustom
                    min={0}
                    max={100}
                    defaultValue={volume * 100}
                    key={`slider-${volume}`}
                    onChange={onVolumeChange}
                  />

                  <PlayerTimes
                    currentTime={currentTime}
                    durationTime={durationTime}
                  />
                </VolumneContainer>
              </Grid>
            </Grid>

            <Grid item>
              <IconButton className="control-icon" onClick={onToggleScreenFull}>
                <FullscreenIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </ControlBarWrapper>
      </PlayerControlsWrapper>
    );
  }
);

const PlayerControlsWrapper = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .control-icon {
    color: #fff;
    padding: 0;
  }
`;

const ControlBarWrapper = styled("div")``;

const VolumneContainer = styled("div")`
  display: flex;
  align-items: center;
`;

const VolumCustom = styled(Slider)`
  width: 100px;
  color: #fff;
  margin-left: 4px;
`;

export default PlayerControls;
