import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Card, Title, Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, db, doc} from '../../firebase/index';

import React from 'react'

const SingleNoteView = ({navigation, route }) => {
  const { content, time, title, category, id } = route.params;

  const deleteItem = async () => {
    try {
      await deleteDoc(doc(db, category, id));
    } catch (e) {
      console.log("Error: ", e)
    }
  };
  const handleDeleteClick = () => {
    deleteItem()
    navigation.popToTop();
  }

  return (
    <View className="flex-1">
      <SafeAreaView className="">
        <View className="items-center">
          <Text className="text-4xl font-bold text-black">{title}</Text>
        </View>
        <Card className="m-5">
          <Card.Content>
            <Title className="text-red-500">{time}</Title>
            <Paragraph className="text-xl font-semibold text-black">{content}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <TouchableOpacity className="m-4">
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="m-2" onPress={handleDeleteClick}>
              <MaterialCommunityIcons name="delete" size={25} color="black" />
            </TouchableOpacity>
          </Card.Actions>
        </Card>
      </SafeAreaView>
    </View >
  );
}

export default SingleNoteView