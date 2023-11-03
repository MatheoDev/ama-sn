import React, { useEffect, useState } from "react";
import { addPublicationToFirestore } from "../helpers/publicationSlice";
import { View, TextInput, Button, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { PublicationType } from "../helpers/types";
import { AppDispatch } from "../helpers/store";
import { Timestamp } from "firebase/firestore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../helpers/hook";
import { selectUserConnected } from "../helpers/userSlice";
import RNPickerSelect from 'react-native-picker-select';
import { fetchTopic } from "../helpers/topicSlice";

type RootStackParamList = {
  Home: undefined;
};

export const AddPublications = () => {
  const user = useAppSelector(selectUserConnected);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const topics = useAppSelector((state) => state.topic.list);
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [idTopic, setIdTopic] = useState("");

  const handleAddPublication = () => {
    const currentDate = Timestamp.now();
    
    const publication: PublicationType = {
      title,
      body,
      date: currentDate,
      like: 0,
      idUser: user?.uid,
      idTopic: idTopic,
    };
    dispatch(addPublicationToFirestore(publication));

    setTitle("");
    setBody("");

    navigation.navigate('Home');
  };

  useEffect(() => {
    dispatch(fetchTopic());
  }, []);

  return (
      <View className="p-5">
        <RNPickerSelect
            onValueChange={(value) => setIdTopic(value)}
            items={topics.map((topic) => ({ label: topic.title, value: topic.id }))}
            placeholder={{ label: 'Select a topic', value: null }}
        />
          <TextInput
              className="h-10 border-b border-gray-400 mb-4"
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
          />
          <TextInput
              className="h-10 border-b border-gray-400 mb-4"
              placeholder="Description"
              value={body}
              onChangeText={setBody}
          />
          <Button title="Add Publication" onPress={handleAddPublication} />
      </View>
  );

}


const CreatePublication = () => {
  return (
    <SafeAreaView className="flex-1">
      <AddPublications />
    </SafeAreaView>
  )
}

export default CreatePublication