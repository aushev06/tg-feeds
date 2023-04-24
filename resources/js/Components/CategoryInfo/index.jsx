import React from "react";
import styles from "./CategoryInfo.module.scss";


export const CategoryInfo = ({
  icon,
  name,
  description,
}) => {
  return (
    <div className={styles.root}>
      {icon &&
        (typeof icon === "string" ? (
          <div
            className={styles.icon}
            style={{ backgroundImage: `url(${icon})` }}
          />
        ) : (
          <i>{icon}</i>
        ))}
      <div>
        <h2 className={styles.name}>{name}</h2>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </div>
  );
};
