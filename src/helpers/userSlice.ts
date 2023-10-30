import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../conf/firebase'
import { UserType } from './types/index'


export interface UserState {
  current: UserType | null
}

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: UserType) => {
    const response = await createUserWithEmailAndPassword(auth, user.email, user.password)
    return response.user
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: UserType) => {
    const response = await signInWithEmailAndPassword(auth, user.email, user.password)
    return response.user
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    await signOut(auth)
  }
)

const initialState: UserState = {
  current: null
}

export const favoriteSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      const user = { email: action.payload.email, uid: action.payload.uid } as UserType
      state.current = user
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = { email: action.payload.email, uid: action.payload.uid } as UserType
      state.current = user
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.current = null
    })
  }
});

export const { } = favoriteSlice.actions;

export const selectUserConnected = (state: RootState) => state.user.current

export default favoriteSlice.reducer