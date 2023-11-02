import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';import userSlice from './userSlice'
import publicationSlice from './publicationSlice'
import topicSlice from './topicSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    publication: publicationSlice,
    topic: topicSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'user/createUser/fulfilled',
          'user/loginUser/fulfilled',
          'user/logoutUser/fulfilled',
          'publication/fetchPublication/fulfilled',
          'publication/addPublicationToFirestore/fulfilled',
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.date'],
        // Ignore these paths in the state
        ignoredPaths: ['user.current', 'publication.list'],
      },
    }),

})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)