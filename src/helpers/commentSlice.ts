import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { CommentType } from './types/index'
import { DocumentData, addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../conf/firebase'


export interface CommentState {
    list: CommentType[]
    listForUser: CommentType[]
}

export const addCommentToFirestore = createAsyncThunk<CommentType, CommentType>(
    'comment/addComment',
    async (Comment) => {
        const addComment = await addDoc(collection(db, "Comment"), Comment as DocumentData);
        const newComment = { id: addComment.id, ...Comment }
        return newComment;
    }
)

export const fetchComment = createAsyncThunk(
    'comment/fetchComment',
    async () => {
        const collectionComment = collection(db, "Comment");
        const queryComment = query(collectionComment, orderBy("date", "desc"));
        const querySnapshot = await getDocs(queryComment);
        const comments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return comments;
    }
)

export const fetchCommentByUser = createAsyncThunk(
    'comment/fetchCommentByUser',
    async (id: string) => {
        const collectionComment = collection(db, "Comment")
        const queryComment = query(collectionComment, where("idUser", "==", id))
        const querySnapshot = await getDocs(queryComment);
        const comments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return comments;
    }
)

const initialState: CommentState = {
    list: [],
    listForUser: []
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
  },
    extraReducers: (builder) => {
        builder.addCase(fetchComment.fulfilled, (state, action) => { 
            const comments = action.payload as CommentType[]
            state.list = comments
        })
        builder.addCase(fetchCommentByUser.fulfilled, (state, action) => { 
            const comments = action.payload as CommentType[]
            state.listForUser = comments
        })
    }
});

export const { } = commentSlice.actions

export const selectList = (state: RootState) => state.comment.list
export const selectCommentsUser = (state: RootState) => state.comment.listForUser

export default commentSlice.reducer