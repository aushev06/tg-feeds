import React from "react";

import {Dialog, DialogContent, IconButton, Typography} from "@mui/material";
import styles from "./AuthDialog.module.scss";
import {WelcomeForm} from "./forms/Welcome";

export const AuthModalContext = React.createContext();

export const AuthDialog = ({open = false, onClose}) => {
    const [formType, setFormType] = React.useState("welcome");
    const modalTitle = {
        welcome: "Добро пожаловать",
        register: "Создать аккаунт",
        email: "Вход через E-Mail",
        reset: "Восстановить пароль",
    };

    const openRegisterForm = () => {
        setFormType("register");
    };

    const openEmailForm = () => {
        setFormType("email");
    };

    const openResetForm = () => {
        setFormType("reset");
    };

    const openWelcomeForm = () => {
        setFormType("welcome");
    };

    React.useEffect(() => {
        if (!open) {
            setFormType("welcome");
        }
    }, [open]);

    return (
        <Dialog
            maxWidth="xs"
            open={open}
            onClose={onClose}
            fullWidth
            PaperProps={{
                className: styles.modal,
            }}
        >
            <IconButton onClick={onClose} className={styles.closeButton}>
                <img src={'/assets/icons/close.svg'} className={styles.closeIcon} alt="close"/>
            </IconButton>

            <DialogContent classes={{root: styles.dialogContent}}>
                <div className={styles.content}>
                    <Typography className={styles.title}>
                        {modalTitle[formType]}
                    </Typography>

                    <AuthModalContext.Provider
                        value={{
                            openEmailForm,
                            openRegisterForm,
                            openResetForm,
                            openWelcomeForm,
                            closeModal: onClose,
                        }}
                    >
                        <WelcomeForm/>
                    </AuthModalContext.Provider>
                </div>
            </DialogContent>
        </Dialog>
    );
};
