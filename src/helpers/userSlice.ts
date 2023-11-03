import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../conf/firebase'
import { UserInfoType, UserType } from './types'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

export interface UserState {
  current: UserType | null
  error: string | null
  users: UserInfoType[]
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
  async (uid: string) => {
    // request firestore
    const collectionUser = collection(db, "User")
    const queryUser = query(collectionUser, where("uid", "==", uid))
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

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    // request firestore
    const collectionUser = collection(db, "User")
    const queryUser = await getDocs(collectionUser)

    // get user info
    const users = queryUser.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    return users
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: UserInfoType) => {
    // request firestore
    const collectionUser = collection(db, "User")
    const queryUser = query(collectionUser, where("uid", "==", user.uid))
    const querySnapshot = await getDocs(queryUser)

    const userInfo = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    if (!userInfo.length) {
      // pas d'info on l'a créé 
      await addDoc(collectionUser, { ...user })
      return user
    }

    const docRef = doc(db, "User", userInfo[0].id)
    await updateDoc(docRef, { ...user })
    return user
  }
)

const initialState: UserState = {
  current: null,
  error: null,
  users: []
}

export const userSlice = createSlice({
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload as UserInfoType[]
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (!state.current) return
      if (!action.payload) return

      state.current.info = action.payload as UserInfoType
    })
  }
});

export const { } = userSlice.actions;

export const selectUserConnected = (state: RootState) => state.user.current
export const selectUserInfo = (state: RootState) => state.user.current?.info
export const selectUsers = (state: RootState) => state.user.users

export default userSlice.reducer