import React from "react";
import styles from "./ProfilePopup.module.scss";
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    Popover,
} from "@mui/material";
import {useDispatch} from "react-redux";
import {Link} from "@inertiajs/react";

const ProfilePopup = ({data, onClick}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        if (onClick) {
            onClick();
        }

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        if (window?.confirm("Вы действительно хотите покинуть сайт ?")) {
            window.axios.post('/logout').then(r => {
                localStorage.removeItem('token');
                window.location.href = '/';
            })
        }
    };

    return (
        <>
            <Avatar
                className={styles.mainAvatar}
                alt={data?.name}
                src={data?.avatar}
                onClick={handleClick}
            />
            {data?.id && (
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    className={styles.popover}
                    classes={{
                        root: styles.root,
                        paper: styles.paper,
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Link href={`/user/${data.id}`}>
                        <a>
                            <div className={styles.section1}>
                                <Avatar
                                    alt={data.name}
                                    src={data.avatar}
                                    className={styles.avatar}
                                />
                                <div className={styles.userName}>
                                    <a className={styles.name}>{data.name}</a>
                                    <span>{data.name ? `@${data.name}` : `@user${data.id}`}</span>
                                </div>
                            </div>
                        </a>
                    </Link>
                    <Divider/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onLogout}>Выйти</ListItemButton>
                        </ListItem>
                    </List>
                </Popover>
            )}
        </>
    );
};

export default ProfilePopup;
