import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  authors: [],
  comments: [],
  themes: [],
  newPostsCount: 0,
  posts: {
    data: [],
    current_page: 0,
    last_page: 0,
    from: 0,
    total: 0,
  },
  feeds: {
    data: [],
    current_page: 0,
    last_page: 0,
    from: 0,
    total: 0,
  },
};


export const main = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.posts.current_page = action.payload;
    },

    setFeeds: (state, action) => {
      state.feeds = {
        data: action.payload.data,
        current_page: action.payload.meta.current_page,
        from: action.payload.meta.from,
        last_page: action.payload.meta.last_page,
        total: action.payload.meta.total,
      };
    },

    appendPosts: (state, action) => {
      state.posts = {
        data: action.payload.data,
        current_page: action.payload.meta.current_page,
        from: action.payload.meta.from,
        last_page: action.payload.meta.last_page,
        total: action.payload.meta.total,
      };
    },
  },
});

export const {
  setCategories,
  setThemes,
  setCurrentPage,
  setFeeds,
} = main.actions;
export const { reducer: mainReducer } = main;
