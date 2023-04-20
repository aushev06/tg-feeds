import React from "react";
import styles from "./Category.module.scss";
import {Link} from "@inertiajs/react";

export const CategoryLink = ({
  icon,
  name,
  slug,
}) => {
  if (!slug) {
    return (
      <div className={styles.root}>
        {typeof icon === "string" ? (
          <div
            className={styles.icon}
            style={{ backgroundImage: `url(/storage/${icon})` }}
          />
        ) : (
          icon && <i>{icon}</i>
        )}
        <span>{name}</span>
      </div>
    );
  }

  return (
    <Link href={`/category/${slug}`}>
      <a>
        <div className={styles.root}>
          {typeof icon === "string" ? (
            <div
              className={styles.icon}
              style={{ backgroundImage: `url(${icon})` }}
            />
          ) : (
            icon && <i>{icon}</i>
          )}
          <span>{name}</span>
        </div>
      </a>
    </Link>
  );
};
