import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { Button, Card, Title, Paragraph } from "react-native-paper";
import React from 'react'

const CategoryNotes = ({ navigation, route }) => {
  const { title, noOfNotes, notes } = route.params;
  const CategoryNotes = notes.notes;
  

 const dummyData = [
   {
     time: "Today at 13:21",
     content:
       "Remind Andy about Halifax files. Make sure they get sent by tonight",
   },
   {
     time: "Today at 10:05",
     content: "Send email to John regarding project deadline",
   },
   {
     time: "Yesterday at 15:30",
     content: "Attend meeting with marketing team",
   },
   {
     time: "Monday at 09:00",
     content: "Submit report to HR department",
   },
   {
     time: "Last week at 14:10",
     content: "Complete online training course",
   },
   {
     time: "Today at 16:45",
     content: "Schedule meeting with new client",
   },
   {
     time: "Yesterday at 11:20",
     content: "Review and approve design mockups",
   },
   {
     time: "Last Wednesday at 13:00",
     content: "Attend company-wide town hall meeting",
   },
   {
     time: "Today at 12:00",
     content: "Discuss project updates with team members",
   },
   {
     time: "Last Friday at 17:00",
     content: "Finish coding new feature for website",
   },
 ];

  return (
    <SafeAreaView className="bg-white">
      <View className="items-center flex-row  justify-between mx-10">
        <Text className="text-red-500 text-7xl font-bold">{title}</Text>
        <Text className="text-red-500 text-6xl font-bold">{noOfNotes}</Text>
      </View>
      <View>
        <FlatList
          data={CategoryNotes}
          renderItem={({ item }) => (
            <Card className="m-5 bg-white">
              <Card.Content>
                <Title className="text-red-500">{item.time}</Title>
                <Paragraph className="text-2xl font-bold">{item.title}</Paragraph>
                <Paragraph className="text-xl font-semibold">{item.content}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => {
                  navigation.navigate("SingleNote", {content: item.content, time: item.time, title: item.title})
                }}>View Note....</Button>
              </Card.Actions>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default CategoryNotes