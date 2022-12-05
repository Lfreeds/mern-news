import * as React from "react";
import * as userService from "../../utilities/users-service";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import LogoutIcon from "@mui/icons-material/Logout";
import GradeIcon from "@mui/icons-material/Grade";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const drawerWidth = 240;

export default function FixedBottomNavigation({ user, setUser }) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  });

  const SideBar = () => {
    return (
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={user.firstName} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <GradeIcon />
                </ListItemIcon>
                <ListItemText primary="Top Stories" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Stories" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={handleLogOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    );
  };

  const BottomNav = () => {
    return (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ display: { sm: "none" } }}
      >
        <BottomNavigationAction label="Top Stories" icon={<GradeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Saved Stories" icon={<FavoriteIcon />} />
        <BottomNavigationAction
          label="Log out"
          icon={<LogoutIcon />}
          onClick={handleLogOut}
        />
      </BottomNavigation>
    );
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNav />
        <SideBar />
      </Paper>
    </Box>
  );
}
