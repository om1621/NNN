import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Spacer from "../components/Spacer";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../actions/userActions";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#000000d9",
    width: "100vw",
    minHeight: "95vh",
  },
  formContainer: {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "#EEEEEE",
    margin: "auto",
    borderRadius: "6px",
  },
});

function Login({ history }) {
  const styles = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { loading, user, err } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user, history]);

  return (
    <div className={styles.container}>
      <Spacer top={80} bottom={60}>
        <div className={styles.formContainer}>
          <Header headerText="Login" top={25} left={30} right={30} />
          <Spacer top={25} left={30} right={30}>
            <TextField
              id="email-input"
              label="Email"
              variant="outlined"
              value={email}
              placeholder="Michael@dunderMifflin.com"
              fullWidth={true}
              onChange={(e) => setEmail(e.target.value)}
              helperText={err ? err.email : ""}
              error={err && err.email !== ""}
            />
          </Spacer>
          <Spacer top={25} left={30} right={30}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={err && err.password !== ""}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                error={err && err.password !== ""}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText
                id="my-helper-text"
                error={err && err.password !== ""}
              >
                {err ? err.password : ""}
              </FormHelperText>
            </FormControl>
          </Spacer>
          <Spacer top={25} bottom={25} left={30} right={30}>
            <LoadingButton
              loading={loading}
              fullWidth={true}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          </Spacer>
        </div>
      </Spacer>
    </div>
  );
}

export default Login;
