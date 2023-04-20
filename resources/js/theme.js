import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    palette: {
        primary: {
            main: "#3EC965",
        },
        secondary: {
            main: "#E4E4E4",
        },
    },
    shadows: ["none"],
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    "&:before": {
                        "border-bottom": "1px solid rgba(0, 0, 0, 0.12) !important",
                    },
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    fontFamily: "Formular !important",
                    letterSpacing: "0.5px !important",
                    transition: "none !important",
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 15,
                },
            },
        },

        MuiPopover: {
            styleOverrides: {
                paper: {
                    "box-shadow": "0px 10px 30px rgba(0, 0, 0, 0.08)",
                    "border-radius": 4,
                    "box-sizing": "border-box",
                    border: "1px solid #E4E4E4",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
                containedPrimary: {
                    textTransform: "none",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: "#40D269",
                    },
                },
                textSecondary: {
                    textTransform: "none",
                },
                containedSecondary: {
                    "&:hover": {
                        backgroundColor: "#DCDCDC",
                    },
                },
            },
        },
    },
});
