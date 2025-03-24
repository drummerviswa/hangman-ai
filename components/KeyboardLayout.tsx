import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GestureHandlerEvent } from "react-native-reanimated/lib/typescript/hook";

type KeyType = {
  text: string;
  onPressFn: (text: string) => void;
};

type KeyboardLayoutType = {
  onPressFn: (text: string) => void;
};

const Key = ({ text, onPressFn }: KeyType) => {
  return (
    <TouchableOpacity
      onPress={() => onPressFn(text)}
      className="w-[30px] h-[38px] bg-gray-500 rounded-lg items-center justify-center m-1"
    >
      <Text className="text-white font-extrabold text-2xl">{text}</Text>
    </TouchableOpacity>
  );
};
const KeyboardLayout = ({ onPressFn }: KeyboardLayoutType) => {
  const qwertyRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M",],
  ];
  return (
    <View className="flex-col justify-center">
      {qwertyRows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center mb-2">
          {row.map((key, keyIndex) => (
            <Key key={keyIndex} text={key} onPressFn={onPressFn} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default KeyboardLayout;
