import { View } from "react-native";
import React from "react";
import Svg, { Ellipse, Line, Rect } from "react-native-svg";
import { createAnimatableComponent } from "react-native-animatable";
import { useColorScheme } from "nativewind";

type ManFigureProps = {
  wrongWord: number;
};

const AnimatableLine = createAnimatableComponent(Line);
const AnimatableRect = createAnimatableComponent(Rect);
const AnimatableEllipse = createAnimatableComponent(Ellipse);

//Hangman figure
// 0 - Base
// 1 - SideBar
// 2 - TopBar
// 3 - Rope
// 4 - Head
// 5 - Neck
// 6 - HandsLeft
// 7 - HandsRight
// 8 - Body
// 9 - LegsLeft
// 10 - LegsRight
// Total 11 parts


const ManFigure = ({ wrongWord }: ManFigureProps) => {
  const theme = useColorScheme();
  
  const shapeColor = theme.colorScheme !== "dark" ? "#000000" : "#FFFFFF";
  const Rope = (
    <AnimatableLine
      animation="fadeIn"
      x1="200"
      y1="20"
      x2="200"
      y2="140"
      stroke={shapeColor}
      strokeWidth="5"
    />
  );

  const Head = (
    <AnimatableEllipse
      animation="fadeIn"
      cx="200"
      cy="150"
      rx="40"
      ry="40"
      fill={shapeColor}
    />
  );

  const Neck = (
    <AnimatableRect
      animation="fadeIn"
      width="10"
      height="60"
      x="195"
      y="150"
      fill={shapeColor}
    />
  );

  const HandsLeft = (
    <AnimatableLine
      animation="fadeIn"
      x1="200"
      y1="200"
      x2="150"
      y2="250"
      stroke={shapeColor}
      strokeLinecap="round"
      strokeWidth="10"
    />
  );
  const HandsRight = (
    <AnimatableLine
      animation="fadeIn"
      x1="200"
      y1="200"
      x2="250"
      y2="250"
      stroke={shapeColor}
      strokeLinecap="round"
      strokeWidth="10"
    />
  );

  const Body = (
    <AnimatableRect
      animation="fadeIn"
      width="10"
      height="50"
      x="195"
      y="200"
      fill={shapeColor}
    />
  );

  const LegsLeft = (
    <Svg>
      <AnimatableLine
        animation="fadeIn"
        x1="200"
        y1="250"
        x2="150"
        y2="300"
        stroke={shapeColor}
        strokeLinecap="round"
        strokeWidth="10"
      />
    </Svg>
  );
  const LegsRight = (
    <Svg>
      <AnimatableLine
        animation="fadeIn"
        x1="200"
        y1="250"
        x2="250"
        y2="300"
        stroke={shapeColor}
        strokeLinecap="round"
        strokeWidth="10"
      />
    </Svg>
  );
  const TopBar = (
    <Rect fill={shapeColor} width="280" height="10" x="5" y="15" />
  );

  const SideBar = (
    <Rect fill={shapeColor} width="10" height="350" x="20" y="0" />
  );

  const Base = <Rect fill={shapeColor} width="350" height="40" x="0" y="350" />;

  return (
    <View>
      <Svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMinYMin meet"
        width="240"
        height="240"
      >
        {Base}
        {SideBar}
        {TopBar}
        {wrongWord > 0 && Rope}
        {wrongWord > 1 && Head}
        {wrongWord > 2 && Neck}
        {wrongWord > 3 && HandsLeft}
        {wrongWord > 4 && HandsRight}
        {wrongWord > 5 && Body}
        {wrongWord > 6 && LegsLeft}
        {wrongWord > 7 && LegsRight}
      </Svg>
    </View>
  );
};

export default ManFigure;
