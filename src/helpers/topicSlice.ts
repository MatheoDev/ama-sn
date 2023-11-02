import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TopicType } from "./types/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../conf/firebase";

export interface TopicState {
  list: TopicType[];
}

export const fetchTopic = createAsyncThunk("topic/fetchTopic", async () => {
  const querySnapshot = await getDocs(collection(db, "Groupe"));
  const topics = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return topics;
});


const initialState: TopicState = {
  list: [],
};

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopic.fulfilled, (state, action) => {
      const topics = action.payload as TopicType[];
      state.list = topics;
    });
  },
});

export const {} = topicSlice.actions;

export const selectTopic = (state: RootState) => state.topic.list;

export default topicSlice.reducer;