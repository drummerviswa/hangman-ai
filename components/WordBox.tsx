import { View, Text } from "react-native";
import React from "react";

type WordBoxType = {
  correctWord: string;
  correctLetters: string[];
};

const WordBox = ({ correctWord, correctLetters }: WordBoxType) => {
  return (
    <View className="px-4 items-center py-4 rounded-lg flex-row flex justify-center">
      {correctWord.split("").map((letter, index) => (
        <View
          key={index}
          className="w-16 h-16 bg-gray-200 rounded-lg m-1 items-center justify-center"
        >
          <Text className="text-xl font-extrabold text-black text-center">
            {correctLetters.includes(letter) ? letter : ""}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default WordBox;
