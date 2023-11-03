import React, { useEffect, useState } from "react";
import { addPublicationToFirestore } from "../helpers/publicationSlice";
import { View, TextInput, Button, SafeAreaView, TouchableOpacity, Text } from "react-native";
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
    if (!title || !body) return;

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
        style={styled.picker}
      />
      <TextInput
        className="h-10 border-b border-gray-400 mb-4 "
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
      <TouchableOpacity onPress={() => handleAddPublication()} className="bg-blue-500 text-white p-2 rounded">
        <Text className="text-center text-white">Add Publication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styled = {
  picker: {
    inputIOS: {
      height: 50,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: "#ccc",
      borderWidth: 1,
    },
    inputAndroid: {
      height: 50,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: "#ccc",
      borderWidth: 1,
    },
  }
}


const CreatePublication = () => {
  return (
    <SafeAreaView className="flex-1">
      <AddPublications />
    </SafeAreaView>
  )
}

export default CreatePublication