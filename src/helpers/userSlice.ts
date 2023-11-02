import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../conf/firebase'
import { UserInfoType, UserType } from './types'
import { collection, getDocs, query, where } from 'firebase/firestore'

export interface UserState {
  current: UserType | null
  error: string | null
}

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: UserType) => {
    if (!user.email || !user.password) throw new Error('Email and password are required')

    const response = await createUserWithEmailAndPassword(auth, user.email, user.password)

    if (!response.user) throw new Error('Error creating user')

    return response.user
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: UserType) => {
    if (!user.email || !user.password) throw new Error('Email and password are required')

    const response = await signInWithEmailAndPassword(auth, user.email, user.password)

    if (!response.user) throw new Error('Error logging in user')

    return response.user
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    await signOut(auth)
  }
)

export const fetchInfoUser = createAsyncThunk(
  'user/fetchInfoUser',
  async () => {
    // request firestore
    const collectionUser = collection(db, "User")
    const queryUser = query(collectionUser, where("uid", "==", auth.currentUser?.uid))
    const querySnapshot = await getDocs(queryUser)

    // get user info
    const user = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    // normally there is only one user info
    if (!user.length) return null
    return user[0]
  }
)

const initialState: UserState = {
  current: null,
  error: null
}

export const favoriteSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (!action.payload) {
        state.error = 'L\'utilisateur n\'a pas été créé'
        return
      }

      const user = { email: action.payload.email, uid: action.payload.uid } as UserType
      state.current = user
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (!action.payload) {
        state.error = 'L\'utilisateur n\'a pas pu se connecter'
        return
      }

      const user = { email: action.payload.email, uid: action.payload.uid } as UserType
      state.current = user
      state.error = null
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.current = null
      state.error = null
    })
    builder.addCase(fetchInfoUser.fulfilled, (state, action) => {
      if (!state.current) return
      if (!action.payload) return

      state.current.info = action.payload as UserInfoType
    })
  }
});

export const { } = favoriteSlice.actions;

export const selectUserConnected = (state: RootState) => state.user.current
export const selectUserInfo = (state: RootState) => state.user.current?.info

export default favoriteSlice.reducer