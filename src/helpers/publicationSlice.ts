import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { PublicationType } from './types/index'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../conf/firebase'


export interface PublicationState {
    list: PublicationType[]
}

export const fetchPublication = createAsyncThunk(
    'publication/fetchPublication',
    async () => {
        const querySnapshot = await getDocs(collection(db, "Publication"));
        const publications = querySnapshot.docs.map((doc) => ({
            ...doc.data()
        }));

        return publications;
    }
)

const initialState: PublicationState = {
    list: []
}

export const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {
  },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPublication.fulfilled, (state, action) => { 
            const publications = action.payload as PublicationType[]
            state.list = publications
        })
    }
});

export const { } = publicationSlice.actions;

export const selectList = (state: RootState) => state.publication.list

export default publicationSlice.reducer