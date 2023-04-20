import React from "react";

import styles from "./SideMenu.module.scss";
import clsx from "clsx";
import { Badge } from "@mui/material";
import {Link} from "@inertiajs/react";
import {CategoryLink} from "@/Components/Category";
import {AddCategoryButton} from "@/Components/AddCategoryButton";


export const SideMenu = ({
  title,
  items,
  children,
  limit = 10,
}) => {
  const [_limit, setLimit] = React.useState(limit);

  return (
    <>
      <div className={styles.wrapper}>
        {title && <div className={styles.titleWrapper}>
          <p className={styles.title}>{title}</p>
          <AddCategoryButton />
        </div>
        }
        {children ||
          items?.slice(0, _limit).map((item) => (
            <Link href={item.href} key={item.href}>
              <a>
                <div
                  className={clsx(
                    styles.item,
                    item.active ? styles.active : ""
                  )}
                >
                  <CategoryLink
                    name={item.name}
                    icon={item.icon}
                    isActive={item.active}
                  />
                  {Number(item.count) > 0 && (
                    <Badge
                      className={styles.badge}
                      badgeContent={`+${item.count}`}
                      color="primary"
                    />
                  )}
                </div>
              </a>
            </Link>
          ))}
        {Number(items?.length) > Number(limit) && (
          <p
            className="link mt-10"
            onClick={() =>
              setLimit(
                Number(items?.length) === _limit
                  ? Number(limit)
                  : Number(items?.length)
              )
            }
          >
            {Number(items?.length) !== _limit ? `+ Показать все` : "- Скрыть"}
          </p>
        )}
      </div>
    </>
  );
};
