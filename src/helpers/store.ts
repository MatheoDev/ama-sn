import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from './userSlice'
import publicationSlice from './publicationSlice'
import topicSlice from './topicSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
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
          'publication/fetchPublication/fulfilled'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['user.current', 'publication.list'],
      },
    }),

})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch