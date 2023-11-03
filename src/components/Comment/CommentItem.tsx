import React from 'react';
import { View, Text } from 'react-native';
import { CommentType, UserInfoType } from '../../helpers/types/index';
import { selectUserInfo } from '../../helpers/userSlice';
import { useAppSelector } from '../../helpers/hook';

type CommentItemProps = {
  comment: CommentType;
};

const CommentItem = ({ comment }: CommentItemProps) => {
    const info = useAppSelector(selectUserInfo) as UserInfoType
    const date = new Date(comment.date.seconds * 1000);
    const formattedDate = date.toLocaleString();

  return (
      <View className="mx-auto my-2 p-4 bg-white rounded-lg shadow-md w-11/12">
        <Text className="text-xs font-bold mb-2">{info.pseudo} a commenté:</Text>
        <Text className="text-base mb-2">{comment.text}</Text>
        <Text className="text-xs text-gray-500">{formattedDate}</Text>
    </View>
  );
};

export default CommentItem;
