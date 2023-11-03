import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ChatType, ConversationType } from "./types"
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

export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async (conv: ConversationType) => {
    const collectionChat = collection(db, "Conversation")
    await addDoc(collectionChat, conv)
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