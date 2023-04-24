import './bootstrap';

import "./styles/index.scss";
import "tippy.js/dist/tippy.css";
import "macro-css";

import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {hydrateRoot} from 'react-dom/client'
import React, {useEffect, useState} from "react";
import {theme} from "@/theme";
import {AlertContext} from "@/hooks/useAlert";
import {Alert, Slide, Snackbar, ThemeProvider} from "@mui/material";
import {BottomNav} from "@/Components/BottomNav";
import {Provider, useDispatch} from "react-redux";
import {store} from "@/redux/store";
import {useGetCategoriesQuery} from "@/redux/api/category";
import {useGetFeedQuery} from "@/redux/api/feed";
import {setUser} from "@/redux/slices/user";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

export const MainContext = React.createContext();

const Component = function (props) {
    const dispatch = useDispatch();


    useEffect(() => {
        if (props.children.props.initialPage.props.auth.user) {
            dispatch(setUser(props.children.props.initialPage.props.auth.user));
        }
    })

    const [alertInfo, setAlertInfo] = useState({
        text: '',
        status: 'info',
        opened: false,
    });

    const openAlert = (text, status) => {
        setAlertInfo({
            text,
            status,
            opened: true,
        });
    };

    const closeAlert = () => {
        setAlertInfo((prev) => ({
            ...prev,
            opened: false,
        }));
    };

    const openLoginModal = () => {
        const el = document.querySelector("#login-btn");
        if (el) {
            // @ts-ignore
            el.click();
        }
    };

    return (
        <>
            <MainContext.Provider
                value={{
                    openLoginModal,
                }}
            >
                <ThemeProvider theme={theme}>
                    <AlertContext.Provider value={{alertInfo, openAlert, closeAlert}}>
                        {props.children}
                    </AlertContext.Provider>
                    <Snackbar
                        TransitionComponent={Slide}
                        key={Slide.name}
                        anchorOrigin={{vertical: "top", horizontal: "right"}}
                        open={alertInfo.opened}
                        autoHideDuration={4500}
                        onClose={closeAlert}
                    >
                        <Alert severity={alertInfo.status}>{alertInfo.text}</Alert>
                    </Snackbar>
                    <BottomNav/>
                </ThemeProvider>
            </MainContext.Provider>
        </>
    )

}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        hydrateRoot(el, <Provider store={store}>
            <Component>
                <App {...props} />
            </Component>
        </Provider>)
    },
    progress: {
        color: '#4B5563',
    },
});
