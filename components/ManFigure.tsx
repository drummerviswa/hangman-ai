import { View } from "react-native";
import React from "react";
import Svg, { Ellipse, Line, Rect } from "react-native-svg";
import { createAnimatableComponent } from "react-native-animatable";

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

const shapeColor = "#000033";

const ManFigure = ({ wrongWord = 12 }: ManFigureProps) => {
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
      ry="25"
      fill={shapeColor}
    />
  );

  const Neck = (
    <AnimatableRect
      animation="fadeIn"
      width="10"
      height="50"
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
      x2="140"
      y2="200"
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
      x2="260"
      y2="200"
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
    <Rect fill={shapeColor} width="250" height="10" x="5" y="15" />
  );

  const SideBar = (
    <Rect fill={shapeColor} width="10" height="350" x="20" y="0" />
  );

  const Base = <Rect fill={shapeColor} width="250" height="40" x="0" y="350" />;

  return (
    <View>
      <Svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMinYMin meet"
        width="140"
        height="200"
      >
        {wrongWord > 0 && Base}
        {wrongWord > 1 && SideBar}
        {wrongWord > 2 && TopBar}
        {wrongWord > 3 && Rope}
        {wrongWord > 4 && Head}
        {wrongWord > 5 && Neck}
        {wrongWord > 6 && HandsLeft}
        {wrongWord > 7 && HandsRight}
        {wrongWord > 8 && Body}
        {wrongWord > 9 && LegsLeft}
        {wrongWord > 10 && LegsRight}
      </Svg>
    </View>
  );
};

export default ManFigure;
