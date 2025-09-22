import { configureStore } from '@reduxjs/toolkit';
import { analysisApi } from '../features/api/analysisApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [analysisApi.reducerPath]: analysisApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(analysisApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;