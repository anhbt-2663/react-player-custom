import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@material-ui/core";

const formatTime = (seconds: string | number): string => {
  if (isNaN(+seconds)) {
    return "00:00";
  }

  const date = new Date(+seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }

  return `${mm}:${ss}`;
};

interface PlayerTimesProps {
  currentTime: string | number;
  durationTime: string | number;
}

const PlayerTimes: React.FC<PlayerTimesProps> = ({
  currentTime,
  durationTime,
}) => {
  return (
    <VideoTime>
      <Typography>
        {formatTime(currentTime)} / {formatTime(durationTime)}
      </Typography>
    </VideoTime>
  );
};

const VideoTime = styled(Box)`
  color: #fff;
  margin-left: 16px;
`;

export default PlayerTimes;
