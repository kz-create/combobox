import React from "react";
import MuiPopover from "@mui/material/Popover";
import { PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

type PopoverProps = MuiPopoverProps & {
  onClose?: () => void;
};

export const Popover: React.FC<PopoverProps> = ({ onClose, ...props }) => {
  return (
    <MuiPopover
      open={props.open}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={onClose}
    >
      {props.children}
    </MuiPopover>
  );
};
