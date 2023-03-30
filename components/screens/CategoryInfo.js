import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const CategoryInfo = ({ title, noOfNotes }) => {
  return (
      <View className="flex flex-row justify-between  my-2 mx-10">
        <Text className="text-6xl font-semibold text-blue-800">{title}</Text>
        <Text className="text-6xl font-medium text-blue-800">{noOfNotes}</Text>
      </View>
  );
}

export default CategoryInfo