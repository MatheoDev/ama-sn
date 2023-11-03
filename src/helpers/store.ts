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
import commentSlice from './commentSlice'
import topicSlice from './topicSlice'
import chatSlice from './chatSlice';

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
    comment: commentSlice,
    topic: topicSlice,
    chat: chatSlice
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
          'publication/fetchPublicationByUser/fulfilled',
          'publication/addPublicationToFirestore/fulfilled',
          'comment/fetchComment/fulfilled',
          'comment/fetchCommentByUser/fulfilled',
          'comment/addCommentToFirestore/fulfilled',
          'topic/fetchTopic/fulfilled',
          'topic/fetchPublicationByTopic/fulfilled',
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.date'],
        // Ignore these paths in the state
        ignoredPaths: [
          'user.current',
          'publication.list', 
          'comment.list',
          'topic.list', 
          'topic.listPublication',
          'publication.listForUser',
          'comment.listForUser'
        ],
      },
    }),

})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)