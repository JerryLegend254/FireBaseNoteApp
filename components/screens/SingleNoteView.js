import { View, Text, SafeAreaView } from 'react-native'
import { Button, Card, Title, Paragraph } from "react-native-paper";
import React from 'react'

const SingleNoteView = ({ route }) => {
    const {content, time, title} = route.params
  return (
      <SafeAreaView>
          <View className="items-center">
              <Text className="text-4xl font-bold">{title}</Text>
          </View>
      <Card className="m-5">
        <Card.Content>
          <Title className="text-red-500">{time}</Title>
          <Paragraph className="text-xl font-semibold">
            {content}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}

export default SingleNoteView