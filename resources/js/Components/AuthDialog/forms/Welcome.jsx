import React from "react";


import styles from "../AuthDialog.module.scss";
import {useDispatch} from "react-redux";
import {AuthModalContext} from "@/Components/AuthDialog";
import {Button} from "@/Components/Button";
import {setUser} from "@/redux/slices/user";
import { router } from '@inertiajs/react';


export const WelcomeForm = () => {
    const dispatch = useDispatch();
    const {openRegisterForm, openEmailForm, closeModal} =
        React.useContext(AuthModalContext);

    const handleButtonClick = (provider) => {
        const win = window.open(
            `/api/social/` + provider,
            "",
            "width=700; height=500"
        );
        const popupTick = setInterval(async () => {
            if (win?.closed) {
                clearInterval(popupTick);
                try {
                    window.axios.get('/api/user').then(r => {
                        console.log(r.data);
                        dispatch(setUser(r.data));
                    });
                    closeModal();


                } catch (err) {
                    alert("Произошла ошибка при авторизации");
                }
            }
        }, 100);
    };

    return (
        <>
            <p className={styles.subTitle}>Рады видеть Вас снова!</p>
            <div className={styles.welcomeButtons}>
                <Button onClick={() => handleButtonClick("vk")} variant="outlined">
                    <i>
                        <img src={'/assets/icons/vk-icon.svg'} alt="Vk"/>
                    </i>
                    Войти через VK
                </Button>
                <Button variant="outlined" onClick={() => handleButtonClick("google")}>
                    <i>
                        <img src={'/assets/icons/google-icon.svg'} alt="Google"/>
                    </i>
                    Войти через Google
                </Button>
            </div>
        </>
    );
};
