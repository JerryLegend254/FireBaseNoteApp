import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import React, { useState } from "react";
import { collection, addDoc, db, serverTimestamp, auth } from "../../firebase/index";
import { Snackbar } from "react-native-paper";

const CreateNote = ({ navigation, route }) => {
  const { category } = route.params;
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setVisible(false)
  }
  const handleAddNote = async () => {
    try {
      const docRef = await addDoc(collection(db, `${category}`), {
        title,
        note,
        category,
        createdAt: serverTimestamp(),
        userId : auth.currentUser.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleAddClick = () => {
    title.length > 0 &&
      note.length > 0 &&
      handleAddNote();
    Keyboard.dismiss();
    setVisible(!visible);
    setTimeout(() =>  navigation.navigate("ChooseCategory"), 2000)
  };
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
      <TouchableOpacity onPress={handleAddClick}>
        <Button className="border bg-red-500 mx-4 p-4">
          <Text className="text-black text-xl">ADD NOTE</Text>
        </Button>
      </TouchableOpacity>
      <View className="h-80">
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          // action={{
          //   label: "Undo",
          //   onPress: () => {
          //     // Do something
          //   },
          // }}
        >
          <Text className="text-white">New {category} note was added</Text>
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default CreateNote;
