import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PublicationType, TopicType } from "./types/index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../conf/firebase";

export interface TopicState {
  list: TopicType[];
  listPublication: PublicationType[];
}

export const fetchTopic = createAsyncThunk("topic/fetchTopic", async () => {
  const querySnapshot = await getDocs(collection(db, "Groupe"));
  const topics = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return topics;
});

export const fetchPublicationByTopic = createAsyncThunk(
  "topic/fetchPublicationByTopic",
  async (topic: string) => {
    const collectionPublication = collection(db, "Publication");
    const queryPublication = query(collectionPublication,where("idTopic", "==", topic));
    const querySnapshot = await getDocs(queryPublication);
    const publications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return publications;
  }
);


const initialState: TopicState = {
  list: [],
  listPublication: [],
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
    builder.addCase(fetchPublicationByTopic.fulfilled, (state, action) => {
      const publications = action.payload as PublicationType[];
      state.listPublication = publications;
    });
  },
});

export const {} = topicSlice.actions;

export const selectTopic = (state: RootState) => state.topic.list;

export default topicSlice.reducer;