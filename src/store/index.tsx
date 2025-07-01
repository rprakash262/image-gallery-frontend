import { configureStore } from "@reduxjs/toolkit";

import alertBoxReducer from "./slices/alertBoxSlice";
import albumReducer from "./slices/albumsSlice";

export const store = configureStore({
  reducer: {
    alertBox: alertBoxReducer,
    albums: albumReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
