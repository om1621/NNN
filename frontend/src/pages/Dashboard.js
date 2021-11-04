import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../actions/userListActions";
import { makeStyles } from "@mui/styles";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#000000d9",
    width: "100vw",
    minHeight: "95vh",
    paddingBottom: "50px",
  },
  grid: {
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "6px",
  },
});

const convert = (str) => {
  const date = new Date(str);
  return Math.floor((Date.now() - date.getTime()) / 86400000);
};

function Dashboard() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { loading, userList } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Container maxWidth="md">
        <Spacer top={20}>
          <Header headerText="Dashboard" align="left" color="#eeeeee" />
        </Spacer>

        {loading && (
          <Spacer top={30}>
            <CircularProgress />
          </Spacer>
        )}

        {!loading &&
          userList.map((user) => {
            return (
              <Spacer top={20}>
                <div className={styles.grid}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} md={3}>
                      <Typography variant="h6" align="center" color="#47664f">
                        User Name
                      </Typography>
                      <Typography variant="h6" align="center">
                        {user.userName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="h6" align="center" color="#47664f">
                        Clean Streak
                      </Typography>
                      <Typography variant="h6" align="center">
                        {convert(user.lastWankedDay)} Days
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="h6" align="center" color="#ff3939">
                        Wanking Count
                      </Typography>
                      <Typography variant="h6" align="center">
                        {user.wankingCount}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="h6" align="center" color="#47664f">
                        Score
                      </Typography>
                      <Typography variant="h6" align="center">
                        {user.score}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Spacer>
            );
          })}
      </Container>
    </div>
  );
}

export default Dashboard;
