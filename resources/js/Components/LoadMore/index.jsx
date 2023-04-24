import React from "react";
import { Button } from "../Button";

import styles from "./LoadMore.module.scss";

export const LoadMore = ({ onClick, disabled }) => {
  return (
    <div className={styles.loadMore}>
      <Button
        disabled={disabled}
        onClick={onClick}
        className={styles.button}
        variant="outlined"
      >
        Показать еще
      </Button>
    </div>
  );
};
