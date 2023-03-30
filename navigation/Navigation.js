import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'
const Navigation = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
      </NavigationContainer>
  )
}


export default Navigation