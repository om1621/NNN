import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import Linker from "./Linker";
import Spacer from "./Spacer";
import { userLogout } from "../actions/userActions";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(userLogout());
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Spacer left={40}>
              <Linker to="/">Nut Games</Linker>
            </Spacer>
          </Typography>
          {user === null ? (
            <>
              <Linker to="/signup">
                <Button color="inherit">Sign up</Button>
              </Linker>

              <Linker to="/login">
                <Button color="inherit">Login</Button>
              </Linker>
            </>
          ) : (
            <div>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="inherit"
                onClick={handleClick}
              >
                {user && user.userName}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
