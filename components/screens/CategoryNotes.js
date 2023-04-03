import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const formatTime = (hr, min) => {
  return `${hr < 10 ? `0${hr}` : hr}:${min < 10 ? `0${min}` : min}`;
};
const CategoryNotes = ({ navigation, route }) => {
  const { title, noOfNotes, notes } = route.params;

  const modifiedNotes = notes.map((n) => {
    const { createdAt } = n;
    let ems = createdAt.seconds * 1000;
    let currentDate = new Date(ems);
    let dateString = currentDate.toDateString();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let formattedTime = formatTime(hours, minutes);

    let time = `${formattedTime} on ${dateString}`;
    return {
      id: n.id,
      note: n.note,
      title: n.title,
      time,
      category: n.category,
    };
  });

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.pop(1)}>
          <View className="flex-start flex-row items-center">
            <Ionicons name="chevron-back" size={35} color="blue" />
            <Text className="text-blue-700 text-xl font-semibold">
              My notes
            </Text>
          </View>
        </TouchableOpacity>
        <View className="items-center flex-row  justify-between mx-10 my-16">
          <Text className="text-red-500 text-7xl font-bold">{title}</Text>
          <Text className="text-red-500 text-6xl font-bold">{noOfNotes}</Text>
        </View>
        <View className="bg-white">
          <FlatList
            data={modifiedNotes}
            renderItem={({ item }) => (
              <Card className="m-5 shadow-2xl bg-white">
                <Card.Content>
                  <Title className="text-red-500">{item.time}</Title>
                  <Paragraph className="text-2xl font-bold">
                    {item.title}
                  </Paragraph>
                  <Paragraph className="text-xl font-semibold">
                    {item.note}
                  </Paragraph>
                </Card.Content>
                <Card.Actions>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SingleNote", {
                        id: item.id,
                        content: item.note,
                        title: item.title,
                        time: item.time,
                        category: item.category,
                      });
                    }}
                  >
                    <Text className="text-red-500 text-lg font-semibold m-3">
                      View note...
                    </Text>
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CategoryNotes;
