import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ChatType } from "./types"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../conf/firebase"

export type ChatState = {
}

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message: ChatType) => {
    const collectionChat = collection(db, "Chat")
    await addDoc(collectionChat, message)
  }
)

const initialState: ChatState = {
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
  },
})

export const { } = chatSlice.actions

export default chatSlice.reducer