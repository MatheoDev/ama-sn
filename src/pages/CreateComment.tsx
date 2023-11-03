import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CommentItem from '../components/Comment/CommentItem';
import { db } from "../conf/firebase";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { PublicationType, CommentType } from "../helpers/types";
import PublicationItem from '../components/Publication/PublicationItem';
import { useDispatch } from 'react-redux';
import { addCommentToFirestore } from '../helpers/commentSlice';
import { AppDispatch } from '../helpers/store';
import { useAppSelector } from '../helpers/hook';
import { selectUserConnected } from "../helpers/userSlice";
import { collection, query, where, getDocs } from "firebase/firestore";

type ParamsRoute = {
    publicationId: string;
};

const CommentsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const route = useRoute();
    const params: ParamsRoute = route.params as ParamsRoute;
    const publicationId = params?.publicationId;
    const [publication, setPublication] = useState<PublicationType | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState('');

        const currentUser = useAppSelector(selectUserConnected);
        const currentUserID = currentUser?.uid;

        const handleSendComment = () => {
        if (!newComment || !publicationId) return;
        

        const comment: CommentType = {
            idPublication: publicationId,
            idUser: currentUserID as string,
            text: newComment,
            date: Timestamp.now(),
        };

        dispatch(addCommentToFirestore(comment));
        setNewComment('');
    };

    useEffect(() => {
        const fetchPublication = async () => {
        if (!publicationId) return;

        const publicationRef = doc(db, "Publication", publicationId);
        const pubDoc = await getDoc(publicationRef);

        if (pubDoc.exists()) {
            setPublication({
            id: publicationId,
            ...pubDoc.data() as PublicationType
            });
        }
            
        const commentsRef = collection(db, "Comment");
        const q = query(commentsRef, where("publicationId", "==", publicationId));
        const commentsSnapshot = await getDocs(q);
        
        const fetchedComments: CommentType[] = [];
        commentsSnapshot.forEach((doc) => {
            const data = doc.data() as CommentType;
            fetchedComments.push({ id: doc.id, ...data });
        });
        console.log(fetchedComments)

        setComments(fetchedComments);
        };

        fetchPublication();
    }, [publicationId]);

    return (
        <View className='flex-1'>
        <View className='p-10'>
            {publication && <PublicationItem item={publication} />}
        </View>
        <FlatList
            data={comments}
            keyExtractor={(item, index) => item.id || String(index)}
            renderItem={({ item }) => <CommentItem comment={item} />}
        />
        <View className="flex-row p-2.5 border-t border-gray-300">
            <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Ajouter un commentaire..."
            className="flex-1 border border-gray-300 p-1.5 mr-2.5"
            />
            <Button title="Envoyer" onPress={handleSendComment} />
        </View>
        </View>
    );
    };

export default CommentsPage;
