import React from "react";
import Spacer from "./Spacer";
import Typography from "@mui/material/Typography";


function Header({ headerText, top, bottom, left, right, align, color }) {
  return (
    <Spacer top={top} bottom={bottom} left={left} right={right}>
      <Typography
        color={color}
        variant="h3"
        component="h1"
        align={align ? align : "center"}
      >
        {headerText}
      </Typography>
    </Spacer>
  );
}

export default Header;
