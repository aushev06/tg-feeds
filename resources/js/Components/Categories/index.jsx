import React from "react";
import styles from "./Categories.module.scss";
import {SideMenu} from "../SideMenu";


export const Categories = ({items}) => {
    return (
        <div className={styles.root}>
            <SideMenu
                title="Категории"
                items={items.map((obj) => ({
                    name: obj.name,
                    icon: `${obj.icon}`,
                    href: `/category/${obj.id}`,
                    active: window.location.pathname === `/category/${obj.id}`,
                }))}
            />
        </div>
    );
};
