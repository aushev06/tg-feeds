import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./slices/user";
import {directoryReducer} from "./directory/slice";
import {mainReducer} from "./main/slice";
import {categoryApi} from "./api/category";
import {feedApi} from "./api/feed";


export const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            directory: directoryReducer,
            main: mainReducer,
            [categoryApi.reducerPath]: categoryApi.reducer,
            [feedApi.reducerPath]: feedApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(categoryApi.middleware).concat(feedApi.middleware),
    });

export const store = makeStore();
