import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { PublicationType } from './types/index'
import { collection, doc, getDocs } from 'firebase/firestore'
import db from '../conf/firebase'


export interface PublicationState {
  current: PublicationType | null
}

export const fetchPublication = createAsyncThunk(
    'publication/fetchPublication',
    async () => {
        const querySnapshot = await getDocs(collection(db, "Publication"));
        const publication = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            publication: doc.data(),   
        }));
        return publication;
    }
)

const initialState: PublicationState = {
  current: null
}

export const favoriteSlice = createSlice({
  name: 'publication',
    initialState: {
        publicationArray:[],
    },
  reducers: {
  },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPublication.fulfilled, (state, action) => { 
            state.publicationArray = action.payload;
        })
    }
});

export const { } = favoriteSlice.actions;

export const selectList = (state: RootState) => state.user.current

export default favoriteSlice.reducer