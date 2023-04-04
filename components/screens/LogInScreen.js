import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "../../firebase/index";

const auth = getAuth();
const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.pop();
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

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("HomeScreen");
        setEmail("");
        setPassword("")

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    Keyboard.dismiss();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <KeyboardAvoidingView
      className="items-center justify-center flex-1 bg-blue-1100"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="mb-20">
        <Text className="text-white text-7xl font-black">My Notes</Text>
      </View>
      <View className="w-4/5 justify-center">
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
      <View className="mt-5 w-1/2">
        <TouchableOpacity
          className="bg-blue-700 rounded items-center p-4"
          onPress={handleSignIn}
        >
          <Text className="text-white text-sm font-bold">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded items-center p-4 mt-4"
          onPress={handleRegister}
        >
          <Text className="text-blue-700 font-bold text-sm">Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;
