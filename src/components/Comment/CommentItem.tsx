import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CommentType, UserInfoType } from '../../helpers/types/index';
import { fetchInfoUser, fetchUsers, selectUserInfo, selectUsers } from '../../helpers/userSlice';
import { useAppDispatch, useAppSelector } from '../../helpers/hook';

type CommentItemProps = {
  comment: CommentType;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  const [user, setUser] = useState<UserInfoType | undefined>(undefined);
  const users = useAppSelector(selectUsers)
  const date = new Date(comment.date.seconds * 1000);
  const formattedDate = date.toLocaleString();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    const userComment = users.find(user => user.uid === comment.idUser)
    setUser(userComment)
  }, [])

  return (
    <View className="mx-auto my-2 p-4 bg-white rounded-lg shadow-md w-11/12">
      {user && <Text className="text-xs font-bold mb-2">{user.pseudo} a commenté:</Text>}
      <Text className="text-base mb-2">{comment.text}</Text>
      <Text className="text-xs text-gray-500">{formattedDate}</Text>
    </View>
  );
};

export default CommentItem;
