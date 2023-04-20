import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Hamburger.module.scss";
import clsx from "clsx";
import { Sidebar } from "../SideBar";
import { Drawer } from "@mui/material";


export const Hamburger = () => {
  // const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const prevPath = React.useRef("");

  // React.useEffect(() => {
  //   console.log(prevPath.current, router.asPath);
  //   if (prevPath.current !== router.asPath) {
  //     setOpen(false);
  //   }
  //   if (prevPath.current === "/" && router.asPath === "/") {
  //     setOpen(false);
  //   }
  //   prevPath.current = router.asPath;
  // }, [router]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={clsx(styles.root, open ? styles.rootActive : "")}
      >
        {open ? (
          <CloseIcon style={{ color: "#fff", width: 24, height: 24 }} />
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="1"
              x2="13"
              y2="1"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="7"
              x2="13"
              y2="7"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="13"
              x2="13"
              y2="13"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <Drawer
        classes={{ paper: styles.menu }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Sidebar />
      </Drawer>
    </>
  );
};
