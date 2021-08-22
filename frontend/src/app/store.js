import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatSlice";

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
