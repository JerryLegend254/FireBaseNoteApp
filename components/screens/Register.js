import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard} from 'react-native'
import React, { useState } from 'react'
import { getAuth, updateProfile, createUserWithEmailAndPassword } from '../../firebase/index'


const auth = getAuth();
const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

      const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
              const user = userCredential.user;
              updateProfile(auth.currentUser, {
                  displayName : lName
              }).then(() => {
              }).catch((e) => {
                  alert(e)
              })
            navigation.navigate("LogInScreen");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
          });
        Keyboard.dismiss();
      };
  return (
    <KeyboardAvoidingView
      className="items-center justify-center flex-1 bg-blue-1100"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="mb-5">
        <Text className="text-white text-7xl font-black">Register</Text>
      </View>
      <View className="w-4/5 justify-center">
        <TextInput
          className="bg-white border p-4 rounded my-2"
          placeholder="First Name"
          value={fName}
          keyboardType="email-address"
          onChangeText={(text) => setFName(text)}
          keyboardAppearance="dark"
        />
        <TextInput
          className="bg-white border p-4 rounded my-2"
          placeholder="Last Name"
          value={lName}
          keyboardType="email-address"
          onChangeText={(text) => setLName(text)}
          keyboardAppearance="dark"
        />
        <TextInput
          className="bg-white border p-4 rounded my-2"
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          keyboardAppearance="dark"
        />

        <TextInput
          className="bg-white border p-4 rounded my-2"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardAppearance="dark"
        />
      </View>
      <View className="mt-5 w-5/6 items-center">
        <TouchableOpacity className="bg-blue-700 rounded w-3/5 items-center p-4" onPress={handleRegister}>
          <Text className="text-white text-sm font-bold">Register</Text>
        </TouchableOpacity></View>
    </KeyboardAvoidingView>
  );
}

export default Register