import React from "react";
import { makeStyles } from "@mui/styles";
import bgimage from "../images/b796ca9ca0d19476836d5063dfbef402.png";
import { Button } from "@mui/material";
import Linker from "../components/Linker";

const useStyles = makeStyles({
  home: {
    backgroundImage: `url(${bgimage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100vw",
    height: "95vh",
  },
  floatingButton: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    maxWidth: "250px",
  },
});

function Home() {
  const styles = useStyles();
  return (
    <div className={styles.home}>
      <Linker to="/dashboard">
        <Button
          variant="contained"
          size="large"
          className={styles.floatingButton}
          fullWidth={true}
          color="inherit"
        >
          Go To DashBoard
        </Button>
      </Linker>
    </div>
  );
}

export default Home;
