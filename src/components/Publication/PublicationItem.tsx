import { Text, TouchableOpacity, View } from "react-native";
import { PublicationType } from "../../helpers/types";
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { db } from "../../conf/firebase";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../helpers/hook";
import { selectUserConnected } from "../../helpers/userSlice";


type PublicationItemProps = {
  item: PublicationType
}

const PublicationItem = ({ item }: PublicationItemProps) => {

  const currentUser = useAppSelector(selectUserConnected);
  const currentUserID = currentUser?.uid;

  const [likes, setLikes] = useState(item.like);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!currentUserID) {
      return;
    }
    if (item.likedByUsers && item.likedByUsers.includes(currentUserID)) {
      setHasLiked(true);
    }
  }, [item]);

  
  const date = new Date(item.date.seconds * 1000);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
  
  const handleLike = async () => {
    if (!currentUserID) {
      return;
    }
    if (!item.id) {
      return;
    }

    const publicationRef = doc(db, "Publication", item.id);

    try {
      await runTransaction(db, async (transaction) => {
        const pubDoc = await getDoc(publicationRef);
        if (!pubDoc.exists()) {
          throw "Document does not exist!";
        }

        const currentLikes = pubDoc.data()?.like || 0;
        let newLikes = currentLikes;
        const currentLikedBy = pubDoc.data()?.likedBy || [];
        if (hasLiked) {
          newLikes = currentLikes - 1;
          const index = currentLikedBy.indexOf(currentUserID);
          if (index !== -1) currentLikedBy.splice(index, 1);
        } else {
          newLikes = currentLikes + 1;
          currentLikedBy.push(currentUserID);
        }

        transaction.update(publicationRef, { like: newLikes, likedByUsers: currentLikedBy });
        setLikes(newLikes);
        setHasLiked(!hasLiked);
      });
    } catch (error) {
    }
  }

  return (
    <View className='w-11/12 bg-white my-3 rounded-md p-4 mx-auto'>
      <Text className='text-lg font-bold mb-4'>{item.title}</Text>
      <Text className='text-base mb-4'>{item.body}</Text>
      <Text className='text-sm text-gray-600 mb-4'>{formattedDate}</Text>
      <View className='flex-row justify-around items-center'>
        <TouchableOpacity className='mx-2 flex-row' onPress={handleLike}>
          <AntDesign name="like1" size={18} color="black" />
          <Text className='text-sm ml-1'>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity className='mx-2'>
          <FontAwesome name="comment" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className='mx-2'>
          <Entypo name="share-alternative" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PublicationItem