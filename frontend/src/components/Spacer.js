import React from "react";
import { makeStyles } from "@mui/styles";

function Spacer({ children, top, bottom, left, right }) {
  const useStyles = makeStyles({
    spacer: {
      paddingTop: top ? top : 0,
      paddingBottom: bottom ? bottom : 0,
      paddingLeft: left ? left : 0,
      paddingRight: right ? right : 0,
    },
  });

  const styles = useStyles();

  return <div className={styles.spacer}>{children}</div>;
}

export default Spacer;
