import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Categories from "../../assets/model/categoryData";
import CategoryInfo from "./CategoryInfo";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CategoriesNotes from "../../assets/model/CategoryNotesMock";
import { collection, db, getDocs, query, where } from "./firebase/index";
import uuid from "react-native-uuid";



const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [personalNotes, setPersonalNotes] = useState([]);
  const [workNotes, setWorkNotes] = useState([]);
  const [ideasNotes, setIdeasNotes] = useState([]);
  const [listsNotes, setListsNotes] = useState([]);
  let pCount = 0,
    wCount = 0,
    iCount = 0,
    lCount = 0;
  // const mappings = {
  //   Personal: pCount,
  //   Work: wCount,
  //   Ideas: iCount,
  //   Lists: lCount,
  // };

  const getCategoryInfo = async () => {
    try {
      // const q = query(
      //   collection(db, "shopping"),
      //   where("category", "==", `Personal`)
      // );

      const querySnapshot = await getDocs(collection(db, "shopping"));
      setAllNotes(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (e) {
      console.log("Error", e);
    }
  };
  useEffect(() => {
    getCategoryInfo();
    allNotes.map((n) => {
      const { category } = n;
      switch (category) {
        case "Personal":
          pCount++;
          console.log(pCount);
          break;
        case "Work":
          wCount++;
          break;
        case "Ideas":
          iCount++;
          break;
        case "Lists":
          lCount++;
          break;
      }
    });
  }, []);

  const setify = (ar) => {
    let setCat = new Set();
    ar.map((n) => setCat.add(n.category));
    const setArr = [...setCat];
    return setArr;
  };

  const coverter = (ar, mapper) => {
    const arrayData = []
    ar.map((c, i) => {c; 
      console.log(mapper[c])
      // arrayData.push({ title: c, noOfItems: mapper[c], id: i })
    });
    return arrayData
  }
  // const countValues = (array, c) => {
  //   let count = 0;
  //   array.forEach(({ category }) => {
  //     if (category === c) count++;
  //   });
  //   return {() => {setCategories([...categories, { title: c, noOfItems: count, id: uuid.v4() }])
  // }
  // }
  // countValues(allNotes, "Personal")
  // countValues(allNotes, "Lists")
  // console.log(arr)
  // const setted = setify(allNotes);

  // const CategoriesWithNotes = coverter(setted, mappings);
  console.log(Categories)
  // console.log(allNotes)
  return (
    <SafeAreaView>
      <View className="flex-0.1 flex-row justify-center mt-20">
        <Text className="text-red-500 text-7xl font-bold">My </Text>
        <Text className="text-blue-800 text-7xl font-bold">Notes</Text>
      </View>
      <View className="my-24">
        <FlatList
          data={Categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const categoryNotes = CategoriesNotes[item.title];
                navigation.navigate("CategoryNotes", {
                  title: item.title,
                  noOfNotes: item.noOfItems,
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
      <View>
        <Text>No of things: {pCount}</Text>
      </View>
      <View className="flex-row justify-between items-center mx-8">
        <TouchableOpacity>
          <View className="items-center">
            <Entypo name="menu" size={60} color="indigo" />
            <Text className="text-red-500 text-lg">Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChooseCategory")}>
          <AntDesign name="pluscircle" size={90} color="red" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// const CategoriesWithNotes = setify(allNotes);
