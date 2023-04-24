import React, {useState} from 'react';
import {Box, Drawer, IconButton} from "@mui/material";
import styles from './PostViewDrawer.module.scss'
import CloseIcon from "@mui/icons-material/Close";

const PostViewDrawer = ({description, isOpen, setIsOpen, title}) => {
    const list = () => (
        <Box
            sx={{
                '@media (max-width: 600px)': {
                    width: '100%',
                },
            }}
            role="presentation"
        >
            <div className={styles.container} dangerouslySetInnerHTML={{__html: description}}></div>
        </Box>
    );

    return (
        <Drawer
            classes={{paper: styles.paper}}
            anchor={'right'}
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div className={styles.cartHeader}>
                <h1>{title}</h1>
                <IconButton  className={styles.closeButton} onClick={() => setIsOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </div>

            {list()}
        </Drawer>
    );
};

export default PostViewDrawer;
