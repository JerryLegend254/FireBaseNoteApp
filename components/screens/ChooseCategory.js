import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { RadioButton, Button } from "react-native-paper";
import React, { useState } from 'react'
import Categories from "../../assets/model/categoryData"
import { TouchableOpacity } from 'react-native-gesture-handler';



const mappedCategories = Categories.map(c => (<RadioButton.Item label={c.title} value={c.title} key={c.id} />))
const ChooseCategory = ({ navigation }) => {
    const [value, setValue] = useState("Lists");

  return (
    <SafeAreaView>
      <View className="m-4 border p-2 rounded-lg mt-10">
        <Text className="self-center text-2xl font-bold">
          Choose Category of the Note
        </Text>
        <RadioButton.Group
          onValueChange={(value) => setValue(value)}
          value={value}
        >
          {mappedCategories}
        </RadioButton.Group>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("CreateNote", {category: value })}>
        <Button className="border bg-red-500 mx-4 p-4">CHOOSE</Button>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ChooseCategory