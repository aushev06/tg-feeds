import React from "react";
import styles from "./SideBar.module.scss";

import {SideMenu} from "@/Components/SideMenu";
import {Categories} from "@/Components/Categories";
import {useGetCategoriesQuery} from "@/redux/api/category";

export const Sidebar = () => {

    const categoryQuery = useGetCategoriesQuery();

    return (
        <div className={styles.wrapper}>
            <SideMenu
                items={[
                    {
                        icon: <img src={'/assets/icons/hot.svg'} alt="Популярное"/>,
                        name: "Все",
                        active: true,
                        href: "/",
                    },
                    // {
                    //   icon: <img src={'/assets/icons/apple.svg'} alt="Свежее" />,
                    //   name: "Свежее",
                    //   active: "new" in router.query,
                    //   href: "/?new",
                    //   count: postsCount,
                    // },
                ]}
            />
            {!categoryQuery.isLoading && <Categories items={categoryQuery?.data?.data || []}/>}
        </div>
    );
};
