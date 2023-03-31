import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import React, { useState } from "react";
import { collection, addDoc, db } from "./firebase/index";



const CreateNote = ({ navigation, route }) => {
  const { category } = route.params;
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleAddNote = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title,
        note,
        category,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleAddClick = () => {
    title.length > 0 &&
      note.length > 0 &&
      navigation.navigate("ChooseCategory");
    handleAddNote();

  } 
  return (
    <SafeAreaView className="mt-10">
      <Text className="self-center text-5xl font-bold">{category}</Text>
      <Card className="m-5 bg-white">
        <Card.Content>
          <Title className="text-red-500 text-xl font bold">{title}</Title>
          <Paragraph className="text-xl font-semibold">{note}</Paragraph>
        </Card.Content>
      </Card>
      <TextInput
        className="border p-4 mx-10 rounded"
        placeholder="Enter the title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        className="border p-5 m-4 rounded"
        placeholder="Enter the notes here"
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <TouchableOpacity
        onPress={handleAddClick}
      >
        <Button className="border bg-red-500 mx-4 p-4">
          <Text className="text-black text-xl">ADD NOTE</Text>
        </Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateNote;
