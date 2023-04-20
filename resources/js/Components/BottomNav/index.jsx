import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Paper,
} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import styles from "./BottomNav.module.scss";
import ProfilePopup from "@/Components/ProfilePopup";


export const BottomNav = ({ user }) => {
  const [commentsOpened, setCommentsOpened] = React.useState(false);

  const onClickLogin = () => {
    const el = document.querySelector("#login-btn");
    if (el) {
      // @ts-ignore
      el.click();
    }
  };

  return (
    <>
      <Drawer
        classes={{ paper: styles.drawerPaper }}
        anchor="bottom"
        open={commentsOpened}
        onClose={() => setCommentsOpened(false)}
      >
      </Drawer>
      <Paper
        className={styles.paper}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            onClick={() => alert(123)}
            icon={<HomeOutlinedIcon style={{ fontSize: 28 }} />}
          />
          <BottomNavigationAction
            onClick={() => setCommentsOpened(true)}
            icon={<ChatBubbleOutlineIcon />}
          />
          <BottomNavigationAction
            onClick={onClickLogin}
            icon={
              user ? <ProfilePopup data={user} /> : <ExitToAppOutlinedIcon />
            }
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
