import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Card, Title, Paragraph} from 'react-native-paper';
import React, {useState} from 'react'



const CreateNote = ({navigation, route }) => {
  const { category } = route.params;
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  return (
    <SafeAreaView>
      <Text className="self-center text-5xl font-bold">{category}</Text>
      <Card className="m-5 bg-white">
        <Card.Content>
          <Title className="text-red-500 text-xl font bold">{title}</Title>
          <Paragraph className="text-xl font-semibold">
            {note}
          </Paragraph>
        </Card.Content>
  
      </Card>
      <TextInput
        className="border p-4 m-5"
        placeholder="Enter the title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        className="border p-5 m-4"
        placeholder="Enter the notes here"
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <TouchableOpacity onPress={() => {
        title.length > 0 && note.length > 0 && navigation.navigate("ChooseCategory")
      }
      }>
        <Button className="border bg-red-500 mx-4 p-4">
          <Text className="text-black text-xl">ADD NOTE</Text>
        </Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default CreateNote