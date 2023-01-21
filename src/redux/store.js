import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chat";
import userSlice from "./slices/user";

const store = configureStore({
  reducer: {
    chat: chatSlice,
    user: userSlice,
  },
});
export default store;
