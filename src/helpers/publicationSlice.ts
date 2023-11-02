import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { PublicationType } from './types/index'
import { DocumentData, addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../conf/firebase'


export interface PublicationState {
    list: PublicationType[]
    listForUser: PublicationType[]
}

export const addPublicationToFirestore = createAsyncThunk<PublicationType, PublicationType>(
    'publication/addPublication',
    async (publication) => {
        const addPublication = await addDoc(collection(db, "Publication"), publication as DocumentData);
        const newPublication = { id: addPublication.id, ...publication }
        return newPublication;
    }
)

export const fetchPublication = createAsyncThunk(
    'publication/fetchPublication',
    async () => {
        const collectionPublication = collection(db, "Publication");
        const queryPublication = query(collectionPublication, orderBy("date", "desc"));
        const querySnapshot = await getDocs(queryPublication);
        const publications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return publications;
    }
)

export const fetchPublicationByUser = createAsyncThunk(
    'publication/fetchPublicationByUser',
    async (id: string) => {
        const collectionPublication = collection(db, "Publication")
        const queryPublication = query(collectionPublication, where("idUser", "==", id))
        const querySnapshot = await getDocs(queryPublication);
        const publications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return publications;
    }
)

const initialState: PublicationState = {
    list: [],
    listForUser: []
}

export const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {
  },
    extraReducers: (builder) => {
        builder.addCase(fetchPublication.fulfilled, (state, action) => { 
            const publications = action.payload as PublicationType[]
            state.list = publications
        })
        builder.addCase(fetchPublicationByUser.fulfilled, (state, action) => { 
            const publications = action.payload as PublicationType[]
            state.listForUser = publications
        })
    }
});

export const { } = publicationSlice.actions

export const selectList = (state: RootState) => state.publication.list
export const selectListPubUser = (state: RootState) => state.publication.listForUser

export default publicationSlice.reducer