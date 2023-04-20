import React from "react";
import AddIcon from "@mui/icons-material/Add";

import styles from "./Header.module.scss";
import {Backdrop, IconButton} from "@mui/material";
import clsx from "clsx";
import {Link} from "@inertiajs/react";
import ProfilePopup from "@/Components/ProfilePopup";
import {AuthDialog} from "@/Components/AuthDialog";
import {Hamburger} from "@/Components/Hamburger";
import {Button} from "@/Components/Button";

export const Header = (props) => {
    const user = props.user?.id ? props.user : null;

    console.log(user);

    const [visibleSearch, setVisibleSearch] = React.useState(false);
    const [visibleLogin, setVisibleLogin] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState("");
    const searchInputRef = React.useRef(null);

    React.useEffect(() => {
        if (visibleSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [visibleSearch, user]);

    const onOpenSearch = () => {
        setVisibleSearch(true);
    };

    const onCloseSearch = () => {
        setVisibleSearch(false);
    };

    const handleClickLogin = async () => {
        setVisibleLogin(true);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {!visibleSearch && <Hamburger/>}
                <div className={styles.headerSide}>
                    {!visibleSearch && (
                        <div className={user ? styles.headerLogo : styles.headerLogoAuth}>
                            <Link href="/">
                                <a>
                                    <img src={'/assets/logo.svg'} alt="Logo"/>
                                </a>
                            </Link>
                        </div>
                    )}
                    {false && (
                        <div className={styles.headerLinks}>
                            <Link href="/about">
                                <a>
                                    <Button>
                                        <span className={styles.text}>О проекте</span>
                                    </Button>
                                </a>
                            </Link>
                            <Link href="/rules">
                                <a>
                                    <Button>
                                        <span className={styles.text}>Правила</span>
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>

                <div
                    className={clsx(
                        styles.headerSide,
                        visibleSearch && styles.headerSideSearch
                    )}
                >
                    {!visibleSearch ? (
                        <>
                            <div className={styles.headerMiniButtons}>
                                <IconButton onClick={onOpenSearch}>
                                    <img src={'/assets/icons/search.svg'} className="search-icon" alt="Search"/>
                                </IconButton>

                                <div className={styles.icons}>
                                    {user && (
                                        <>
                                            <div className={styles.profile}>
                                                <ProfilePopup data={user}/>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <AuthDialog
                                onClose={() => {
                                    setVisibleLogin(false);
                                }}
                                open={visibleLogin}
                            />

                            <div>
                                {!user && (
                                    <Button
                                        id="login-btn"
                                        className={styles.loginButton}
                                        onClick={handleClickLogin}
                                        color="secondary"
                                    >
                                        Войти
                                    </Button>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <img className="mr-15" src="/search.svg" alt="Поиск"/>
                            <input
                                ref={searchInputRef}
                                className={styles.input}
                                placeholder="Поиск"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <IconButton onClick={onCloseSearch}>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.70547 4.99999L9.35048 1.35499C9.43239 1.25934 9.47519 1.1363 9.47033 1.01047C9.46547 0.884629 9.4133 0.765259 9.32426 0.676212C9.23521 0.587165 9.11584 0.534998 8.99 0.530138C8.86416 0.525277 8.74113 0.56808 8.64548 0.649993L5.00047 4.29499L1.35548 0.644993C1.25982 0.56308 1.13679 0.520277 1.01095 0.525138C0.88511 0.529998 0.765741 0.582164 0.676694 0.671212C0.587646 0.760259 0.53548 0.879628 0.530619 1.00547C0.525759 1.1313 0.568562 1.25434 0.650475 1.34999L4.29548 4.99999L0.645475 8.64499C0.593134 8.68982 0.550624 8.74498 0.520612 8.80701C0.490601 8.86904 0.473735 8.93661 0.471076 9.00547C0.468416 9.07433 0.480019 9.14299 0.505156 9.20716C0.530294 9.27132 0.568423 9.32959 0.61715 9.37832C0.665877 9.42705 0.724151 9.46517 0.788314 9.49031C0.852476 9.51545 0.921142 9.52705 0.990002 9.52439C1.05886 9.52173 1.12643 9.50487 1.18846 9.47486C1.25049 9.44484 1.30565 9.40233 1.35048 9.34999L5.00047 5.70499L8.64548 9.34999C8.74113 9.43191 8.86416 9.47471 8.99 9.46985C9.11584 9.46499 9.23521 9.41282 9.32426 9.32378C9.4133 9.23473 9.46547 9.11536 9.47033 8.98952C9.47519 8.86368 9.43239 8.74064 9.35048 8.64499L5.70547 4.99999Z"
                                        fill="white"
                                    />
                                </svg>
                            </IconButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
