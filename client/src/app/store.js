import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {authApi} from "../features/api/authApi"; // Import the authApi slice

export const appStore = configureStore({
  reducer: rootReducer, // Use the combined reducer
  middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware), // Add any additional middleware if needed
});