import React from "react";
import styles from "./MiniPost.module.scss";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

interface MorePopupProps {
  isOwner?: boolean;
  onClickRemove: () => void;
  onClickEdit: () => void;
}

export const MorePopup: React.FC<MorePopupProps> = ({
  isOwner,
  onClickRemove,
  onClickEdit,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.moreButton}>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        {isOwner && (
          <>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={onClickRemove}>
                  <span>Удалить</span>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={onClickEdit}>
                  Редактировать
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </>
        )}
        {!isOwner && (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <span className={styles.blockLabel}>Пожаловаться</span>
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Popover>
    </div>
  );
};
