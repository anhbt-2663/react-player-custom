import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { Grid, Slider } from "@material-ui/core";

interface PlayerProgressBarProps {
  played: number;
  onSeekChange: (e: ChangeEvent<{}>, value: number | number[]) => void;
  onSeekMouseDown: (e: ChangeEvent<{}>) => void;
  onSeekMouseUp: (e: ChangeEvent<{}>, value: number | number[]) => void;
}

const marks = [
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 45,
  },
];

const PlayerProgressBar: React.FC<PlayerProgressBarProps> = ({
  played,
  onSeekChange,
  onSeekMouseDown,
  onSeekMouseUp,
}) => {
  return (
    <Grid item xs={12}>
      <ProgressBar
        min={0}
        max={100}
        value={played * 100}
        onChange={onSeekChange}
        onMouseDown={onSeekMouseDown}
        onChangeCommitted={onSeekMouseUp}
        defaultValue={60}
        marks={marks}
        aria-label="Progress bar"
      />
    </Grid>
  );
};

const ProgressBar = styled(Slider)`
  padding: 4px;

  .MuiSlider-track {
    border: none;
  }

  .MuiSlider-track,
  .MuiSlider-rail {
    height: 4px;
    border-radius: 2px;
  }

  .MuiSlider-track {
    color: #ff0000;
  }

  .MuiSlider-rail {
    color: #464546;
  }

  .MuiSlider-thumb {
    height: 16px;
    width: 16px;
    margin-top: -6px;
    background-color: #fff;
    border: 2px solid currentColor;

    &:before {
      display: none;
    }

    &:focus,
    &:hover,
    &.Mui-active,
    &.Mui-focusVisible {
      box-shadow: "inherit";
    }
  }

  .MuiSlider-valueLabel {
    left: calc(-50% + 4px);
  }

  .MuiSlider-mark {
    background-color: orange !important;
    height: 4px;
    width: 4px;
    &.MuiSlider-markActive {
      opacity: 1;
      background-color: currentColor;
    }
  }
`;

export default PlayerProgressBar;
