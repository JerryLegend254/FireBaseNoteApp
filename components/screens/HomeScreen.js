import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
// import Categories from "../../assets/model/categoryData";
import CategoryInfo from "./CategoryInfo";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CategoriesNotes from "../../assets/model/CategoryNotesMock";
import { collection, db, getDocs, onSnapshot } from "../../firebase/index";
import uuid from "react-native-uuid";
import { orderBy } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [pNotes, setPNotes] = useState([]);
  const [wNotes, setWNotes] = useState([]);
  const [iNotes, setINotes] = useState([]);
  const [lNotes, setLNotes] = useState([]);
  const allNotes = [...pNotes, ...wNotes, ...iNotes, ...lNotes];

  const getPNotes = () => {
    try {

        const unsub = onSnapshot(collection(db, "Personal"), (querySnapshot) => {
        setPNotes(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getWNotes = () => {
    try {
      const unsub = onSnapshot(collection(db, "Work"), (querySnapshot) => {
        setWNotes(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getINotes = () => {
    try {
      const unsub = onSnapshot(collection(db, "Ideas"), (querySnapshot) => {
        setINotes(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getLNotes = async () => {
    try {
      const unsub = onSnapshot(collection(db, "Lists"), (querySnapshot) => {
        setLNotes(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (e) {
      console.log("Error", e);
    }
  };
  const getAllNotes = () => {
    getPNotes();
    getWNotes();
    getINotes();
    getLNotes();
  };
  const setify = (ar) => {
    let setCat = new Set();
    ar.map((n) => setCat.add(n.category));
    const setArr = [...setCat];
    return setArr;
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  const allCategories = setify(allNotes);
  const mapping = {
    Personal: pNotes.length,
    Work: wNotes.length,
    Ideas: iNotes.length,
    Lists: lNotes.length,
  };

  const transform = (arr) => {
    const tranformedArr = arr.map((c, i) => ({
      id: i,
      title: c,
      noOfItems: mapping[c],
    }));
    return tranformedArr;
  };

  const Categories = transform(allCategories);

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="flex-row justify-center mt-20">
          <Text className="text-red-500 text-7xl font-bold">My </Text>
          <Text className="text-blue-800 text-7xl font-bold">Notes</Text>
        </View>
        <View className="my-28">
          <FlatList
            data={Categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  let categoryNotes;
                  //   const categoryNotes = CategoriesNotes[item.title];
                  //   navigation.navigate("CategoryNotes", {
                  //     title: item.title,
                  //     noOfNotes: item.noOfItems,
                  //     notes: categoryNotes,
                  //   });
                  // }
                  const { title, noOfItems } = item;

                  switch (title) {
                    case "Personal":
                      categoryNotes = pNotes;
                      break;
                    case "Work":
                      categoryNotes = wNotes;
                      break;
                    case "Ideas":
                      categoryNotes = iNotes;
                      break;
                    case "Lists":
                      categoryNotes = lNotes;
                      break;
                  }
                  navigation.navigate("CategoryNotes", {
                    title,
                    noOfNotes: noOfItems,
                    notes: categoryNotes,
                  });
                }}
              >
                <CategoryInfo title={item.title} noOfNotes={item.noOfItems} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View className="place-self-end flex-row justify-between items-center mx-8">
          <TouchableOpacity>
            <View className="items-center">
              <Entypo name="menu" size={60} color="indigo" />
              <Text className="text-red-500 text-lg">Menu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChooseCategory")}
          >
            <AntDesign name="pluscircle" size={90} color="red" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
