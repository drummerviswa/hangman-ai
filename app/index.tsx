import HintBox from "@/components/HintBox";
import KeyboardLayout from "@/components/KeyboardLayout";
import ManFigure from "@/components/ManFigure";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View } from "react-native";
export default function Index() {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
  }, []);
  return (
    <View className="flex-1 items-center justify-around gap-2 p-4 my-8">
      <View className="flex-2 flex-row gap-x-2">
        <ManFigure wrongWord={10} />
      </View>
      <View className="flex-1 flex-col gap-y-2">
        <HintBox hintData={hint} />
        <KeyboardLayout />
      </View>
    </View>
  );
}
