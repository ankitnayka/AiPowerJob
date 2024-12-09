import { configureStore } from "@reduxjs/toolkit";
import jobSeekerReducer from "../redux/jobSeekerSlice.js"; // Your jobSeeker slice
import { jobSeekerApi } from "@/features/api/jobSeekerapi"; // RTK Query API
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Persist Configuration
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Use localStorage
  whitelist: ["jobSeeker"], // Specify slices to persist (jobSeeker state)
};

// Combine reducers
const rootReducer = combineReducers({
  jobSeeker: jobSeekerReducer, // Your jobSeeker slice reducer
  [jobSeekerApi.reducerPath]: jobSeekerApi.reducer, // RTK Query API slice
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(jobSeekerApi.middleware), // Add RTK Query middleware
});

// Export the persistor to use with PersistGate
export const persistor = persistStore(store);

// Export the store
export default store;
    