import Button from "@/components/Button";
import HintBox from "@/components/HintBox";
import ManFigure from "@/components/ManFigure";
import { Alert, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-y-2">
      <View className="flex flex-row gap-x-2">
        <ManFigure wrongWord={70} />
      </View>
      <View>
        <HintBox />
      </View>
    </View>
  );
}
